/**
 * Created by sasha on 23/08/16.
 */
var optionLenth = {};
optionLenth["сантиметр"] = 100;
optionLenth["миллиметр"] = 1000;
optionLenth["микрометр"] = 1000000;
optionLenth["микрон"] = 1000000; 
optionLenth["нанометр"] = 1000000000 ;
optionLenth["ангстрем"] = 10000000000;
optionLenth["километр"] = 1/1000;
optionLenth["пункт"] = 1000/0.353;
optionLenth["дюйм"] = 1000/25.39;
optionLenth["ярд"] = 1/0.9144;
optionLenth["мили"] = 1/100/1.6093;
optionLenth["фут"] = 3.281;
optionLenth["аршин"] = 1/2.13;

var BadData = ["Проверте входные данные","Входные данные неверные"];
var LenthConvert = function( from , n , to)
{
    try {
        return n/optionLenth[from]*optionLenth[to];
    }catch(e)
    {
     return BadData[Random(0,1)];
    }

}

var optionTem = {};
optionTem["градусов"] = -1;
optionTem["цельсия"] = -1;
optionTem["кульвин"] =273.3;

var TempConvert = function(from , n , to)
{
    try{
        return n + optionTem[to];
    }catch(e)
    {
        return BadData[Random(0,1)];
    }
}