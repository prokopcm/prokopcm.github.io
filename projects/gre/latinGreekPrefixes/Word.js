var LatinGreekRoots;
(function (LatinGreekRoots) {
    var Word = (function () {
        function Word(props) {
            this.attempts = 0;
            this.correctAttempts = 0;
            this._percentage = 0;
            this.word = props.word;
            this.definitions = props.definitions;
        }
        Object.defineProperty(Word.prototype, "percentage", {
            get: function () {
                return Math.round(this._percentage * 100);
            },
            set: function (newPercentage) {
                this._percentage = newPercentage;
            },
            enumerable: true,
            configurable: true
        });
        Word.prototype.checkAnswer = function (answer, type) {
            var processedAnswers = answer.trim().toLocaleLowerCase().split(',');
            if (type === 'word') {
                return this.word.split(', ').filter(function (w) {
                    return processedAnswers.indexOf(w) > -1;
                }).length > 0;
            }
            else {
                return this.definitions.filter(function (d) {
                    return processedAnswers.indexOf(d) > -1;
                }).length > 0;
            }
        };
        Word.prototype.addAttempt = function (correct) {
            this.attempts++;
            if (correct) {
                this.correctAttempts++;
            }
            this.calcPercentage();
            return this.percentage;
        };
        Word.prototype.calcPercentage = function () {
            if (this.attempts > 0) {
                this.percentage = this.correctAttempts / this.attempts;
            }
            return this.percentage;
        };
        return Word;
    })();
    LatinGreekRoots.Word = Word;
})(LatinGreekRoots || (LatinGreekRoots = {}));
