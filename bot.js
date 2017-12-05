const twit = require('twit');
const config = require('./config.js');

var Twitter = new twit(config);

var params = {
  q: 'a OR b OR c OR d OR e OR f OR g OR h OR i OR j OR k OR l OR m OR n OR o OR p OR q OR r OR s OR t OR u OR v OR y OR x OR z -filter:retweets',
  count: 100,
  result_type: 'recent',
  lang: 'en',
  tweet_mode: 'extended'
}

Twitter.get('search/tweets', params, function(err, data, response) {
  console.log(data);
  if (!err) {
    for (let i = 0; i < data.statuses.length; i++) {
      console.log(i);
      console.log(data.statuses[i].user.screen_name);
      console.log(data.statuses[i].full_text);
      console.log('Character Count: ' + data.statuses[i].full_text.length);
      let tweetLength = data.statuses[i].full_text.length;
      let replyCheck = data.statuses[i].in_reply_to_status_id_str;
      if (tweetLength > 279 && replyCheck === null) {
        let id = { id: data.statuses[i].id_str}
        let status = {
          in_reply_to_status_id: data.statuses[i].id_str,
          status: '@' + data.statuses[i].user.screen_name + ' test tweet, pardon the interruption - will delete soon'
        }
        Twitter.post('statuses/update', status, function(err, data, response) {
          if (err) {
            console.log(err);
          }
          else {
            let username = data.in_reply_to_screen_name;
            let tweetId = data.in_reply_to_status_id_str;
            let text = data.text;
            console.log('Replied to: ' + `https://twitter.com/${username}/status/${tweetId}` + ' with: ' + text);
          }
        });
      }
    }  
  } else {
    console.log(err);
  }
})