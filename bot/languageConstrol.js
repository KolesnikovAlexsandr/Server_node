/**
 * Created by sasha on 09/09/16.
 */

var Suffix = ["ов","","a","a","ов","ов","ов","ов","ов"];

exports.addSuffixForNumber =  function( varible )
{
    return Suffix[ varible % 10 ];
}