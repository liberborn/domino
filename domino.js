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
             * squareMap describes dots visibility for each number
             * there are 9 dots (3x3) on each square tile
             * 
             * @type {Object}
             */
            squareMap : { // show dots map
                0 : [false, false, false, false, false, false, false, false, false],
                1 : [false, false, false, false, true,  false, false, false, false],
                2 : [false, false, true,  false, false, false, true,  false, false],
                3 : [false, false, true,  false, true,  false, true,  false, false],
                4 : [true,  false, true,  false, false, false, true,  false, true ],
                5 : [true,  false, true,  false, true,  false, true,  false, true ],
                6 : [true,  false, true,  true,  false, true,  true,  false, true ]
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
            setSquareNumber : function (square, num) {
                var dots = square.find('.circle'),
                    squareMap = this.squareMap[num];

                for (var i = 0, m = dots.length; i < m; i++) {
                    if (squareMap[i]) {
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
            setDominoSquares : function (squareNumbers) {
                var squareFirstView = $('div.square-0'),
                    squareSecondView = $('div.square-1');

                this.setSquareNumber(squareFirstView, squareNumbers[0]);
                this.setSquareNumber(squareSecondView, squareNumbers[1]);
            },

            /**
             * update : update view
             * 
             * @param  {Domino.model Object} model
             */
            update : function (model) {
                var me = this;

                me.setDominoPosition(model.type);
                me.setDominoSquares(model.squareNumbers);
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
