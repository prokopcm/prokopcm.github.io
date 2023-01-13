/// <reference path="Word.ts" />
var LatinGreekRoots;
(function (LatinGreekRoots) {
    var WordList = (function () {
        function WordList(words) {
            this.currentWord = null;
            this.pos = null;
            this.totalAttempts = 0;
            this.correctAttempts = 0;
            this.correct = null;
            this.words = words;
        }
        WordList.prototype.getNext = function (type) {
            this.pos = this.getNextPos();
            this.currentWord = this.words[this.pos];
            this.questionType = Math.floor(Math.random() * 2) === 1 ? 'word' : 'definition';
            this.correct = null;
            return this.currentWord;
        };
        WordList.prototype.checkAnswer = function (answer) {
            return this.currentWord.checkAnswer(answer, this.questionType);
        };
        WordList.prototype.attemptAnswer = function (answer) {
            var correct = this.checkAnswer(answer);
            this.currentWord.addAttempt(correct);
            if (correct === true) {
                if (this.correct !== false) {
                    this.correctAttempts++;
                }
                this.totalAttempts++;
            }
            else {
                this.correct = false;
            }
            return correct;
        };
        WordList.prototype.getPercentage = function () {
            /*var sum = 0;
            var numWords = 0;
            this.words.forEach((w) => {
                if (w.attempts > 0) {
                    sum += w.percentage;
                    numWords++;
                }
                
            });*/
            return Math.round((this.correctAttempts / this.totalAttempts) * 100);
        };
        WordList.prototype.getQuestion = function () {
            var q = "What does the prefix " + this.currentWord.word + ' mean?';
            if (this.questionType === 'word') {
                var definitionList = '';
                this.currentWord.definitions.forEach(function (d) {
                    definitionList += d + ', ';
                });
                definitionList = definitionList.substring(0, definitionList.length - 2);
                q = 'What prefix means ' + definitionList + '?';
            }
            return q;
        };
        WordList.prototype.getNextPos = function () {
            if (typeof this.pos !== 'number' || this.pos >= this.words.length - 1) {
                this.pos = 0;
            }
            else {
                this.pos++;
            }
            return this.pos;
        };
        return WordList;
    })();
    LatinGreekRoots.WordList = WordList;
})(LatinGreekRoots || (LatinGreekRoots = {}));
