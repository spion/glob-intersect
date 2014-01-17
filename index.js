// Solves the intersection in a generalized way
// Reference: http://stackoverflow.com/questions/2821506/how-do-you-tell-if-two-wildcards-overlap
function intersectGeneral(w1, w2, kleene, eq) {
    // both are either empty or contain a wildcard
    if ((w1.length === 0 || w1 === kleene) &&
        (w2.length === 0 || w2 === kleene)) 
        return true;
    // only one of them is empty, the other is not just a wildcard
    if (w1.length === 0 || w2.length === 0) 
        return false;

    var c1 = w1[0], c2 = w2[0];
    var remain1 = w1.slice(1), remain2 = w2.slice(1);
    // if first letters match and remaining intersectGeneral
    if (eq(c1, c2) && intersectGeneral(remain1, remain2, kleene, eq)) 
        return true;
    // if either is a wildcard and either remaining intersectGenerals with the other whole
    if ((c1 === kleene || c2 === kleene) && 
        (intersectGeneral(w1, remain2, kleene, eq) || 
         intersectGeneral(remain1, w2, kleene, eq))) 
        return true;
    // else, no match, return false
    return false;
}

function eqChar(c1, c2) { return c1 === c2; }
function eqSegment(s1, s2) {
    return intersectGeneral(s1, s2, '*', eqChar);
}

// Usable export, specialized for paths
function intersect(w1, w2) {
    return intersectGeneral(w1.split('/'), w2.split('/'), '**', eqSegment);
}
 
module.exports = intersect;

