/// <reference path="Word.ts" />
/// <reference path="prefixes.ts" />
/// <reference path="WordList.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
var LatinGreekRoots;
(function (LatinGreekRoots) {
    var wordList = new LatinGreekRoots.WordList(LatinGreekRoots.prefixes.map(function (w) {
        return new LatinGreekRoots.Word(w);
    }));
    if (window.localStorage) {
        var studyResults = window.localStorage.getItem('study-results');
    }
    function _initEvents() {
        $('#submit-answer').click(submitAnswer);
        $(document).keypress(function (e) {
            if (e.keyCode === 13) {
                submitAnswer();
            }
        });
    }
    function _getNext() {
        var next = wordList.getNext();
        _updateQuestion(next);
    }
    function _updateQuestion(next) {
        $('#question').text(wordList.getQuestion());
        $('#answer').val('');
    }
    function _updatePercentage() {
        $('#percentage').text(wordList.getPercentage());
        $('#correct').text(wordList.correctAttempts);
        $('#total').text(wordList.totalAttempts);
    }
    function submitAnswer(e) {
        var answer = $('#answer').val().trim().toLocaleLowerCase();
        var correct = wordList.attemptAnswer(answer);
        if (correct) {
            _getNext();
            _updatePercentage();
        }
    }
    _initEvents();
    _getNext();
})(LatinGreekRoots || (LatinGreekRoots = {}));
