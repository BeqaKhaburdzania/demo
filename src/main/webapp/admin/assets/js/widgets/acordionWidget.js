function createAcordion(div,data){
    var random=Math.floor((Math.random() * 10000) + 1);
    var random2=Math.floor((Math.random() * 10000) + 1);

    div.append('<div class="panel-group panel-accordion dark-accordion" id="accordion'+random+'"></div>');


    var i=0;
    for(key in data){
        var item = data[key];
        outerFuncAcordion(div,item,random,i)
        i++;

    }

    function outerFuncAcordion(divPlace,dataObj,rand,index) {
        var name = dataObj["name"];
        $('#accordion'+random).append(
            '<div class="panel panel-default">' +
            '       <div class="panel-heading">\n' +
            '            <h4>\n' +
            '                <a data-toggle="collapse" data-parent="#accordion'+rand+'"\n' +
            '                   href="#collapse'+index+''+rand+'" '+(i===0?'aria-expanded="true"':'')+'\n' +
            '                   '+(i!==0?'class="collapsed"':"")+'>\n' +
            '                    <i class="fa fa-key" aria-hidden="true"></i>\n' +
            '                    ' +name+
            '                </a>\n' +
            '            </h4>\n' +
            '        </div>' +
            '<div id="collapse'+index+''+rand+'" '+(i===0?'aria-expanded="true"':'')+' class="panel-collapse collapse '+(i===0?"in":"")+'"\n' +
            '             aria-expanded="'+(i===0?"true":'false style="height: 0px;"')+'" >\n' +
            '            <div id="acordionBody'+index+''+rand+'" class="panel-body">' +
            '               ' +
            '            </div>\n' +
            '        </div>' +
            '</div>')
        dataObj.callback($("#acordionBody"+index+""+rand))
    }



}