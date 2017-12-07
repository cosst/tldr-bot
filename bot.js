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
    if (!err) {
      for (let i = 0; i < data.statuses.length; i++) {
        console.log(i);
        console.log(data.statuses[i].user.screen_name);
        console.log(data.statuses[i].full_text);
        console.log('Character Count: ' + data.statuses[i].full_text.length);
        let tweetLength = data.statuses[i].full_text.length;
        let replyCheck = data.statuses[i].in_reply_to_status_id_str;
        let followerCount = data.statuses[i].user.followers_count;
        let followingCount = data.statuses[i].user.friends_count;
        let followRatio = followerCount / followingCount;
        if (tweetLength === 280 && replyCheck === null && followRatio > 1.49 && followerCount > 200) {
          let id = { id: data.statuses[i].id_str};
          let screenName = data.statuses[i].user.screen_name;
          let tweetStrings = [
            'I appreciate your sentiment ' + '@' + screenName + ', but TL;DR.',
            'I mean no disrespect ' + '@' + screenName + ', but maybe you should write about this on Medium or something.',
            'I don\'t mean any disrespect ' + '@' + screenName + ', but you should write about this on Medium or something.',
            'As a wise man said ' + '@' + screenName + ', brevity is the soul of wit.',
            'Pardon me ' + '@' + screenName + ', but you\'re being verbose.',
            'Excuse me ' + '@' + screenName + ', but this is Twitter - TL;DR.',
            'Remember love is all you need ' + '@' + screenName + ', but this is a bit wordy.',
            'We are all Gaia\'s children ' + '@' + screenName + ', nevertheless she would say get to the point faster.',
            'I kind of hate Reddit sometimes ' + '@' + screenName + ', but TL;DR.',
            'You are my friend ' + '@' + screenName + ', but this is long-winded for Twitter.',
            'Apologies ' + '@' + screenName + ', but TooLong;Didn\'tRead, lol.',
            'Sorry to butt in ' + '@' + screenName + ', but TL;DR.',
            '[Denzel voice] My man ' + '@' + screenName + '! You talkative son of a gun.',
            'I see what you\'re getting at ' + '@' + screenName + ', but Hemingway would never approve.',
            'I don\'t want to be rude ' + '@' + screenName + ', but are you paid by the character?',
            'I love you ' + '@' + screenName + ', even so I\'d prefer you be more succinct here.',
            'TL;DR ' + '@' + screenName + ', though I think you\'re a wonderful person.',
            'TL;DR ' + '@' + screenName + ', but I do love you friend.',
            'TL;DR! I love you ' + '@' + screenName + ', but this is too much for Twitter.',
            'I love ' + '@' + screenName + ', you love me, but please keep it to just one-forty.',
            'You\'re loved and respected ' + '@' + screenName + ', but TL;DR.',
            'You\'re a treasure ' + '@' + screenName + ', but TL;DR.',
            'Strong tweet my friend ' + '@' + screenName + ', but TL;DR.',
            'As Nietzsche once said ' + '@' + screenName + ', it is my ambition to say in 140 what others say in a whole 280.',
            'As Horace Grant once told Michael Jordan ' + '@' + screenName + ', quidquid praecipies, esto brevis.',
            'You may think Pascal wordy ' + '@' + screenName + ', but I have only made this tweet longer because I have not had the time to make it shorter.',
            'As the bard himself said ' + '@' + screenName + ', when words are scarce they are seldom spent in vain.',
            'My good friend ' + '@' + screenName + ', Buddha says better than a thousand hollow words, is one word that brings peace.',
            'As that ancient Greek dude Sophocles once said ' + '@' + screenName + ', to speak much is one thing; to speak to the point another!',
            'You seem like a lovely person ' + '@' + screenName + ', but you Tweet like you\'re trying to impress a lawyer.',
            'Do you have a blog ' + '@' + screenName + '? You should write a blog post on this.',
            'Love you ' + '@' + screenName + ' but TL;DR!',
            'You\'re a good person ' + '@' + screenName + ' but TL;DR my friend.',
            'Yo ' + '@' + screenName + ', I\'m really happy for you, Imma let you finish, but 140 characters is better.'               
          ];
          let randomTweet = Math.floor(Math.random() * tweetStrings.length);
          let status = {
            in_reply_to_status_id: data.statuses[i].id_str,
            status: tweetStrings[randomTweet]
          };
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
        // console.log(i);
        // console.log(data.statuses[i].user.screen_name);
        // console.log('Character Count: ' + data.statuses[i].full_text.length);
        // console.log('Follower Count: ' + followerCount);
        // console.log('Following Count: ' + followingCount);
        // console.log('Follow Ratio: ' + followRatio);          
        // console.log(status.status);
        }
      }  
    } else {
      console.log(err);
    }
  });
});