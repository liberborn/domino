/**
 * Domino widget
 * 
 * @type {Object}
 * 
 */
var Domino = {

    /**
     * Domino model : describes its state type (vertical or horizontal)
     * and square numbers
     * 
     * @return {Object} new model instance
     */
    model : function () {
        return {
            /**
             * type : current position (vertical or horizontal)
             * 
             * @type {String}
             */
            type : 'vertical', // 'vertical', 'horizontal'

            /**
             * squareNumbers : current numbers on squares
             * 
             * @type {Array}
             */
            squareNumbers : [0 , 0],

            setSquareNumbers : function (nums) {
                // console.log('set : ' + nums[0] + ', ' + nums[1]);
                this.squareNumbers[0] = nums[0];
                this.squareNumbers[1] = nums[1];
            },

            /**
             * rotateSquareNumbers : rotates numbers in model
             * 
             */
            rotateSquareNumbers : function () {
                var switchedNums = [],
                    nums = this.squareNumbers;

                switchedNums.push(nums[1]);
                switchedNums.push(nums[0]);

                this.setSquareNumbers(switchedNums);
            },

            /**
             * switchType : switches model position
             * 
             */
            switchType : function () {
                if (this.type === 'vertical') {
                    this.type = 'horizontal'
                } else {
                    this.type = 'vertical';
                }
            },

            rotateLeft : function () {
                if (this.type === 'horizontal') {
                    this.rotateSquareNumbers();
                }
                this.switchType();
            },

            rotateRight : function () {
                if (this.type === 'vertical') {
                    this.rotateSquareNumbers();
                }
                this.switchType();
            }
        }
    },

    /**
     * Domino view : draws squares based on tiles map
     * and refreshes its view based on fired events
     * 
     * @return {Object} new view instance
     */
    view : function () {
        return {

            /**
             * squareDotMap : describes dots visibility for each number
             * there are 9 dots (3x3) on each square tile
             * 
             * @type {Object}
             */
            squareDotMap : { // show dots map
                0 : [ ' ', ' ', ' ',      ' ', ' ', ' ',      ' ', ' ', ' '],
                1 : [ ' ', ' ', ' ',      ' ', '0', ' ',      ' ', ' ', ' '],
                2 : [ ' ', ' ', '0',      ' ', ' ', ' ',      '0', ' ', ' '],
                3 : [ ' ', ' ', '0',      ' ', '0', ' ',      '0', ' ', ' '],
                4 : [ '0', ' ', '0',      ' ', ' ', ' ',      '0', ' ', '0'],
                5 : [ '0', ' ', '0',      ' ', '0', ' ',      '0', ' ', '0'],
                6 : [ '0', ' ', '0',      '0', ' ', '0',      '0', ' ', '0'],
            },

            /**
             * squareDotMapHorizontal : square dot map for horizontal position
             * based on squareDotMap (e.g. dot #0 becomes dot #6)
             * 
             * @type {Object}
             */
            squareDotMapHorizontal : {
                0 : 6,
                1 : 3,
                2 : 0,
                3 : 7,
                4 : 4,
                5 : 1,
                6 : 8,
                7 : 5,
                8 : 2
            },

            /**
             * getSquareDotList : get dot list based on domino position
             * 
             * @param  {Number} num
             * @param  {String} type domino position
             * @return {Array}  dot list
             */
            getSquareDotList : function (num, type) {
                var squareDotList = this.squareDotMap[num],
                    squareDotListHorizontal = [],
                    dotHorizontal = null;

                if (type === 'vertical') {
                    return squareDotList;
                } else {
                    for (var i = 0, m = squareDotList.length; i < m; i++) {
                        dotHorizontal = this.squareDotMapHorizontal[i];
                        squareDotListHorizontal.push(squareDotList[dotHorizontal]);
                    }
                    return squareDotListHorizontal;
                }
            },

            /**
             * isSquareDotVisible : check if dot is visible ('0') or hidden ('')
             * 
             * @param  {Array}  squareDotList list from squareDotMap based on selected number
             * @param  {Number} i dot position in square dot list
             * @return {Boolean}
             */
            isSquareDotVisible : function (squareDotList, i) {
                return squareDotList[i] === '0' ? true : false;
            },

            setDominoPosition : function (type) {
                var dominoView = $('div.domino-container');

                if (type === 'vertical') {
                    dominoView.removeClass('horizontal');

                } else if (type === 'horizontal') {
                    dominoView.addClass('horizontal');
                }
            },

            /**
             * setSquareNumber : loop through dots
             * and show/hide them based on square map
             * 
             * @param {Object} square jquery object
             * @param {Number} num    number to show on tile
             */
            setSquareNumber : function (square, num, type) {
                var dots = square.find('.circle'),
                    squareDotList = this.getSquareDotList(num, type);

                for (var i = 0, m = dots.length; i < m; i++) {
                    if (this.isSquareDotVisible(squareDotList, i, type)) {
                        $(dots[i]).css('visibility', 'visible');
                    } else {
                        $(dots[i]).css('visibility', 'hidden');
                    }
                }
            },

            /**
             * setDominoSquares : select two squares and set numbers for them
             * 
             * @param {Array} squareNumbers
             */
            setDominoSquares : function (squareNumbers, type) {
                var squareFirstView = $('div.square-0'),
                    squareSecondView = $('div.square-1');

                this.setSquareNumber(squareFirstView, squareNumbers[0], type);
                this.setSquareNumber(squareSecondView, squareNumbers[1], type);
            },

            /**
             * update : update view
             * 
             * @param  {Domino.model Object} model
             */
            update : function (model) {
                var me = this;

                me.setDominoPosition(model.type);
                me.setDominoSquares(model.squareNumbers, model.type);
            }
        }
    },

    /**
     * Domino controller : create and handle model and view instances
     * 
     */
    controller : {
        models : [],
        views : [],

        /**
         * init : create model and view instances, register events,
         * run randomize method
         * 
         */
        init : function () {
            var model = Domino.model(),
                view = Domino.view();

            this.models.push(model);
            this.views.push(view);

            this.registerEvents();
            this.onRandomize(); // first randomize
        },

        /**
         * getModel : get defined model instance
         *
         * @todo : handle multiple model instances
         * 
         * @return {Domino.model Object} model
         */
        getModel : function () {
            return this.models[0];
        },

        /**
         * getView : get defined view instance
         *
         * @todo : handle multiple view instances
         * 
         * @return {Domino.view Object} view
         */
        getView : function () {
            return this.views[0];
        },

        /**
         * getRandomNumber : simple number randomizer from 0 to 6
         * 
         * @return {Number} random number
         */
        getRandomNumber : function () {
            return Math.floor((Math.random() * 7));
        },

        /**
         * onRandomize : handles randomize event
         * get random numbers, set them in model instance, refresh view instances
         *
         */
        onRandomize : function () {
            var me = this,
                model = me.getModel(),
                squareFirst =  me.getRandomNumber(),
                squareSecond = me.getRandomNumber();

            model.setSquareNumbers([squareFirst, squareSecond]);
            this.refresh();
        },

        /**
         * onRotateLeft : handles rotate left event
         * 
         */
        onRotateLeft : function () {
            this.getModel().rotateLeft();
            this.refresh();
        },

        /**
         * onRotateRight : handles rotate right event
         *
         */
        onRotateRight : function () {
            this.getModel().rotateRight();
            this.refresh();
        },

        /**
         * refresh : update view instances
         * 
         */
        refresh : function () {
            var model = this.getModel(),
                view = this.getView();

            // console.log('refresh : ' + model.squareNumbers);
            view.update(model);
        },

        /**
         * registerEvents : subscribe on UI events
         * 
         */
        registerEvents : function() {
            var me = this;

            $('.domino-left').on('click', function() {
                me.onRotateLeft();
            });

            $('.domino-right').on('click', function() {
                me.onRotateRight();
            });

            $('.domino-refresh').on('click', function () {
                me.onRandomize();
            })
        }
    },

    /**
     * Create new Domino widget
     * 
     */
    create : function () {
        var me = this;

        $(document).ready(function() {
            me.controller.init();
        });
    }
};

Domino.create();
