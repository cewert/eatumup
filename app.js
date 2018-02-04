console.log('Twitter bot is starting...');

const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);

// filter tweets
const stream = T.stream('statuses/filter', {track: "eat um up tigers, eat um' up tigers, eat um up #tigers, eat um' up #tigers, #eatumuptigers"});
// stream all public tweets based on filter
stream.on('tweet', function(tweet) {
    // console.log(tweet);

    // save the ID and screen name of the tweet author
    const tweetUserID = tweet.id_str;
    const tweetUserName = tweet.user.screen_name;
    const vidPath = './eatumup.mp4';
    // only reply to tweets - NOT retweets or replies
    if (!isReply(tweet)) {
        console.log('New tigers tweet detected');
        // post video via the chunked media upload API.
        T.postMediaChunked({file_path: vidPath}, function(err, data, response) {
            // console.log(data);
            if (!err) {
                const mediaIdStr = data.media_id_string;
                const metaParams = {media_id: mediaIdStr};
                // use the mediaId we received from postMediaChunked
                T.post('media/metadata/create', metaParams, function(err, data, response) {
                    if (!err) {
                        // now we can reference the media and post a tweet (media will attach to the tweet)
                        const params = {in_reply_to_status_id: tweetUserID, status: '@' + tweetUserName, media_ids: mediaIdStr};
                        T.post('statuses/update', params, function(err, data, response) {
                            if (!err) {
                                console.log('Reply successfully sent! - https://twitter.com/EatUmUpTigers/status/' + data.id_str);
                            } else {
                                console.log('ERROR calling statuses/update - ' + err);
                            }
                        });
                    } else {
                        console.log('ERROR calling media/metadata/create - ' + err);
                    }
                });
            } else {
                console.log('ERROR calling postMediaChunked - ' + err);
            }
        });
    }
});
/**
 * Returns true if the tweet is a retweet or a reply
 */
function isReply(tweet) {
    if (tweet.retweeted_status
      || tweet.in_reply_to_status_id
      || tweet.in_reply_to_status_id_str
      || tweet.in_reply_to_user_id
      || tweet.in_reply_to_user_id_str
      || tweet.in_reply_to_screen_name) {
          return true;
      }
}
