
var tests = [
    ["file/*/*.js", "file/dir/*", true],
    ["file/**/*.js", "file/dir/*", true],
    ["file/*/*.js", "file/dir/dir/*", false],
    ["file/**/*.js", "file/dir/dir/*", true],
    ["*ends", "begins*", true],
    ["*no", "*intersection", false],
    ["file/dir/*.js", "file/dir/*.cs", false],
    ["a*db*c", "adbxdbbc", true],
    ["a**a", "abcda", true],
    ["*", "f7*u12", true],
    ["ax*", "bx", false],
    ["file/**", "file/dir/*.js", true]
];

var t = require('tape');
var m = require('../index');


t.test("examples", function(t) {
    tests.forEach(function(item) {
        t.test(item[0] + ', ' + item[1] + ' -> ' + (item[2] ? 'yes' : 'no'), function(t) {
            t.equals(m(item[0], item[1]), item[2], 
                     'should ' + item[2] ? '' : 'NOT' + ' intersect');
            t.end();
        });
    });
});



