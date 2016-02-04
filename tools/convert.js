'use strict';

/*

Reformats our old (pre-2016) posts into the new format,
where all info is stored in frontmatter

*/

var fs = require('fs');
var matter = require('gray-matter');
var cheerio = require('cheerio');

var dir = '../_posts';

var main = function () {
  fs.readdir(dir, function(err, files){
    files.forEach(function(file, index){
      //if (file === '2010-12-14-meetup.html'){
      formatData(index, dir+'/'+file);
      //}
    });
  });
};

var getDateFromFilename = function (file) {
  return file.substring(dir.length+1,10+dir.length+1);
};

var getFileNameWithoutDate = function (file) {
  return file.substring(dir.length+12,file.length+1).replace('.markdown', '');
};

function formatData(index, file) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err;

    // Hacky way to un-indent existing frontmatter,
    // so grey-matter can actually parse it
    data = data.replace('  count', 'count');
    data = data.replace('  time', 'time');
    data = data.replace('  meetup', 'meetup');

    console.log('working on', file);
    var post = matter(data);
    var frontmatter = post.data;
    var content = post.content;

    // Bail if file is already in the new format
    if(content.trim() === ''){
      console.log('Bail: '+file);
      return;
    }

    var $ = cheerio.load(content);

    frontmatter.intro = $('p').first().html();
    frontmatter.meetup = 'http://www.meetup.com/up-front-ug/';
    frontmatter.talks = [];

    $('.talk-list > li').each(function(index, element){
      var talk = {};
      var name = $('h4 span', this).text();
      var title = $('h4', this).text();
      talk.title = title.replace(name, '').trim();
      talk.name = name.replace(':', '').trim();
      var video = $('.flex_vid iframe', this).attr('src')
      if(video) {
        talk.video = video;
      }
      talk.description = $('p', this).first().html().trim();
      var bio = $('.talk__bio', this).html();
      if(bio){
        talk.bio = bio.trim();
      }
      talk.links = [];
      $('.talk__links li', this).each(function(index, element){
        var url = $('a', this).attr('href');
        var linkTitle = $(this).text();
        talk.links.push({
          url: url,
          title: linkTitle
        })
      });
      frontmatter.talks.push(talk);
    });

    data = matter.stringify('', frontmatter);
    //console.log('data: ',data);
    // Repair output of intro item to be indented 2, not 4 spaces
    data = data.replace('intro: >\n    ', 'intro: >\n  ');
    //data = data.replace('intro: >\n   ', 'intro: >\n  ');
    //console.log('data: ',data);
    fs.writeFile (file, data, function(err) {
      if (err) throw err;
    });
  });
}

main();
