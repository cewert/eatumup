/*  eslint linebreak-style: ["error", "windows"]    */
console.log('Twitter bot is starting.');

const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);

//
// filter the public stream
//
const stream = T.stream('statuses/filter', {track: "eat um up tigers, eat um' up tigers, eat um up #tigers, eat um' up #tigers, #eatumuptigers"});

stream.on('tweet', function(tweet) {
    //   console.log(tweet);
    const tweetUserID = tweet.id_str;
    const tweetUserName = tweet.user.screen_name;
    const vidPath = 'Z:\\eatumup.mp4';
    // only reply to tweets - NOT retweets
    if (!isReply(tweet)) {
        console.log('New tigers tweet detected!');
        // post media via the chunked media upload API.
        T.postMediaChunked({file_path: vidPath}, function(err, data, response) {
            // console.log(data);
            if (!err) {
                const mediaIdStr = data.media_id_string;
                const metaParams = {media_id: mediaIdStr};
                // console.log(data.media_id_string);
                T.post('media/metadata/create', metaParams, function(err, data, response) {
                    if (!err) {
                        // now we can reference the media and post a tweet (media will attach to the tweet)
                        const params = {in_reply_to_status_id: tweetUserID, status: '@' + tweetUserName, media_ids: mediaIdStr};
                        T.post('statuses/update', params, function(err, data, response) {
                            if (!err) {
                                console.log('TWEET CREATED SUCCSESSFULLY!!!');
                                console.log('Link - https://twitter.com/EatUmUpTigers/status/' + data.id_str);
                            } else {
                                console.log('TWEET CREATION ERROR - ');
                                console.log(err);
                            }
                        });
                    } else {
                        console.log('METADATA/CREATE ERROR - ' + err);
                    }
                });
            } else {
                console.log('POST MEDIA CHUNKED ERROR - ' + err);
            }
        });
    }
});
/**
 * It returns whether the tweet is a reply or a retweet
 * @params tweet object
 * @returns boolean
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
