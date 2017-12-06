const twit = require('twit');
const config = require('./config.js');

var Twitter = new twit(config);

var cron = require('node-cron');

cron.schedule('* * * * *', function(){
  var params = {
    q: 'a OR b OR c OR d OR e OR f OR g OR h OR i OR j OR k OR l OR m OR n OR o OR p OR q OR r OR s OR t OR u OR v OR y OR x OR z -filter:retweets',
    count: 100,
    result_type: 'recent',
    lang: 'en',
    tweet_mode: 'extended'
  };

  Twitter.get('search/tweets', params, function(err, data, response) {
    // console.log(data);
    if (!err) {
      for (let i = 0; i < data.statuses.length; i++) {
        console.log(i);
        console.log(data.statuses[i].user.screen_name);
        console.log(data.statuses[i].full_text);
        console.log('Character Count: ' + data.statuses[i].full_text.length);
        let tweetLength = data.statuses[i].full_text.length;
        let replyCheck = data.statuses[i].in_reply_to_status_id_str;
        if (tweetLength = 280 && replyCheck === null) {
          let id = { id: data.statuses[i].id_str};
          let screenName = data.statuses[i].user.screen_name;
          let tweetStrings = [
            'I appreciate the sentiment ' + '@' + screenName + ', but TL;DR.',
            'I mean no disrespect ' + '@' + screenName + ', but maybe you should talk about this on Medium or something.',
            'As a wise man once said ' + '@' + screenName + ', brevity is the soul of wit.',
            'Excuse me ' + '@' + screenName + ', but you\'re being verbose.',
            'Remember love is love is love is love ' + '@' + screenName + ', but this is a bit wordy.',
            'We are all children of Gaia ' + '@' + screenName + ', nevertheless she would say get to the point faster.',
            '@' + screenName + ' I kinda hate Reddit sometimes, but TL;DR.',
            'You are my friend ' + '@' + screenName + ', yet this is a bit long-winded for Twitter.',
            'Sorry ' + '@' + screenName + ', but TooLong;Didn\'tRead, lol.',
            '@' + screenName + '! My man. You mouthy son of a gun.',
            'I have no problem with this ' + '@' + screenName + ', but Hemingway would never approve.',
            'I don\'t mean to be rude ' + '@' + screenName + ', but are you paid by the character?',
            'I love you ' + '@' + screenName + ', even so I would prefer you be more succinct.',
            'TL;DR ' + '@' + screenName + ', but I think you are a wonderful person.',
            'TL;DR! I love you ' + '@' + screenName + ', but this is unnecessary for Twitter.',
            'I love ' + '@' + screenName + ', you love me, but please keep it to one-forty.',
            '@' + screenName + ' you are loved and respected, yet TL;DR.',
            'As Twitter-Nietzsche once said ' + '@' + screenName + ', it is my ambition to say in 140 what others say in a whole 280.',
            'As Horace Grant once said to Michael Jordan ' + '@' + screenName + ', quidquid praecipies, esto brevis.',
            'You might think Pascal wordy ' + '@' + screenName + ', but I have only made this tweet longer because I have not had the time to make it shorter.',
            'As the bard himself once said ' + '@' + screenName + ', when words are scarce they are seldom spent in vain.',
            'My friend ' + '@' + screenName + ', Buddha says better than a thousand hollow words, is one word that brings peace.',
            'As that old Greek dude Sophocles once said ' + '@' + screenName + ', to speak much is one thing; to speak to the point another!',
            'You seem like a lovely person ' + '@' + screenName + ', but you write like a lawyer.',
            'Do you have a blog ' + '@' + screenName + '? You should do a blog post on this.',
            'I love you ' + '@' + screenName + ' but TL;DR!',
            'Yo ' + '@' + screenName + ', I\'m really happy for you, Imma let you finish, but 140 characters is best.'               
          ]
          let randomTweet = Math.floor(Math.random()*tweetStrings.length);
          let status = {
            in_reply_to_status_id: data.statuses[i].id_str,
            status: tweetStrings[randomTweet]
          }
          Twitter.post('statuses/update', status, function(err, data, response) {
            if (err) {
              console.log(err);
            }
            else {
              let username = data.in_reply_to_screen_name;
              let tweetId = data.in_reply_to_status_id_str;
              let text = data.text;
              console.log('Replied to: ' + `https://twitter.com/${username}/status/${tweetId}`);
              console.log(text);
            }
          });
        }
      }  
    } else {
      console.log(err);
    }
  })
});