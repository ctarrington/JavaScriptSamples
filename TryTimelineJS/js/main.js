var timeline_config = {
    width: "100%",
    height: "70%",
    source: 'timelines/chores.jsonp'
};

function showPDF(daPath)
{
    alert('PATH = '+daPath);
}

function bindToPdf(index, path)
{
    $('body').on('click', '#pop'+index, function() { showPDF(path); } );
}

$(function() {
   bindToPdf(1, 'pdf1.pdf');
   bindToPdf(2, 'pdf2.pdf');
});


