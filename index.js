// Solves the intersection for a single component
// Reference: http://stackoverflow.com/questions/2821506/how-do-you-tell-if-two-wildcards-overlap
function innersect(w1, w2) {
    // both are either empty or contain a wildcard
    if ((w1 === "" || w1 === "*") &&
        (w2 === "" || w2 === "*")) return true;
    // only one of them is empty, the other is not just a wildcard
    if (w1 === "" || w2 === "") return false;
    var c1 = w1[0], c2 = w2[0];
    var remain1 = w1.slice(1), remain2 = w2.slice(1);
    // if first letters match and remaining innersect
    if (c1 === c2 && innersect(remain1, remain2)) return true;
    // if either is a wildcard and either remaining innersects with the other whole
    if ((c1 === '*' || c2 === '*') 
        && (innersect(w1, remain2) || innersect(remain1, w2))) 
        return true;
    // else, no match, return false
    return false;
}
 
// Solves the intersection for paths (arrays of components)
// and double-kleenes
function outersect(w1, w2) {
    // both are either empty or contain a double-kleene
     if ((w1.length === 0 || w1 === "**") && (w2.length === 0 || w2 === "**")) return true;
    // one of them is empty, the other one is non-empty, not double-kleene
    if (w1.length === 0 || w2.length === 0) return false;
    var c1 = w1[0], c2 = w2[0];
    var remain1 = w1.slice(1), remain2 = w2.slice(1);
    // if first items innersect and remaining outersect
    if (innersect(c1,c2) && outersect(remain1, remain2)) return true;
    // if either is a wildcard and either remaining outersects with the other
    if ((c1 === '**' || c2 === '**') 
        && (outersect(w1, remain2) || outersect(remain1, w2))) 
        return true;
    // else, no match, return false
    return false;
}
 
// Usable export.
function intersect(w1, w2) {
    return outersect(w1.split('/'), w2.split('/'));
}
 
module.exports = intersect;
