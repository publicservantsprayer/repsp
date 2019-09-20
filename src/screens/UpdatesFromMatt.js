import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import MediaCard from '../MediaCard'

const db = [
  {
    image:
      'images/mattsupdates/62325493_10219555717311714_1385577658238107648_o.jpg',
    blurb:
      "Rep. Vernon G Smith meeting the First Lady of Ghana at the President's House in Accra, Ghana, West Africa last year after we attended the funeral of former Secretary General of the United Nations, Kofi Annan.",
  },
  {
    image:
      'images/mattsupdates/62012443_10219555717031707_7429159868541435904_o.jpg',
    blurb:
      'Pamela Russell, Matthew Barnes, Member of the Russian Parliament Garik Kurginian, Marina and Luciano Bongarra, and Eric Turner at the 4th biennial Global Conference of Parliament and Faith in Brazil in May 2019.',
  },
  {
    title: 'September 15, 2018',
    image:
      '/Users/aamick/code/repsp/public/images/mattsupdates/41811697_10217512737878505_1292351776715964416_o.jpg',
    blurb: 'Vernon G. Smith',
  },
  {
    title: 'September 15, 2018',
    image:
      'images/mattsupdates/41835229_10217512745638699_2695669342103666688_o.jpg',
    blurb: 'Dinner with Jude Initiative and Phillip Ping — with Phillip Ping.',
  },
  {
    title: 'September 15, 2018',
    image:
      'images/mattsupdates/41799519_10217512739438544_3172397736863465472_o.jpg',
    blurb:
      'Rep. Vernon Smith giving an interview with the BBC after the funeral of Kofi Annan. — with Phillip Ping.',
  },
  {
    title: 'September 15, 2018',
    image:
      'images/mattsupdates/41784432_10217512738758527_6058872491445583872_o.jpg',
    blurb: "Ghana's Minister of Finance",
  },
  {
    title: 'September 15, 2018',
    image:
      'images/mattsupdates/41811697_10217512737878505_1292351776715964416_o.jpg',
    blurb: 'Vernon G. Smith',
  },
  {
    title: 'September 15, 2018',
    image:
      'images/mattsupdates/41776883_10217512736958482_4497859437939130368_o.jpg',
    blurb: 'Pastor Phillip Ping praying at the prayer breakfast.',
  },
  {
    title: 'September 15, 2018',
    image:
      'images/mattsupdates/41860496_10217512732118361_715475254398418944_o.jpg',
    blurb:
      'Rep. Vernon Smith reading Scripture and speaking at the prayer breakfast in Accra, Ghana, Africa. — with Vernon G Smith.',
  },
  {
    title: 'August 30, 2018',
    image:
      'images/mattsupdates/40460835_10217379220180646_1047280895561564160_o.jpg',
    blurb:
      "t's a beautiful day in Indianapolis. I'm honored to attend a special meeting with the Israeli Consulate at the Columbia Club this afternoon. Thanks to Aviv Ezra David Sklar and others!",
  },
  {
    title: 'June 29, 2018',
    image:
      'images/mattsupdates/36373816_10216869299672952_1021672196008837120_o (1).jpg',
    blurb:
      "A few weeks ago my son's car engine died. After a quote of $2500-3100 to put another one in, we found one for $300 and put it in ourselves! It was fun working with Micah Barnes. #SavingMoney #LearningNewThings #ItRunsNow",
  },
  {
    title: 'June 18, 2018',
    image:
      'images/mattsupdates/35546819_10216786967014687_7571092500266352640_o.jpg',
    blurb:
      "As I sat through another Indianapolis City County Council meeting I was reminded of the need for pastoral care in the political arena. By pastoral care, I mean without political agendas or ulterior motives. Our leaders need our unconditional love, sincere prayer, and encouragement. Public Servants are simply people trying to make our communities safer, enjoyable and better overall. I have yet to meet an elected leader who wants to destroy the area they serve! I'm off to the Madison County Commissioners' meeting tomorrow morning. #Pray4Leaders",
  },
  {
    title: 'June 17, 2018',
    image:
      'images/mattsupdates/35464021_10216773344354129_5932574945132412928_o.jpg',
    blurb:
      "Thankful for a faithful dad who taught me how to live faithfully with God, family, and vocation. He is the definition of a father's love. Happy Father's Day Dad! #FathersDay",
  },
  {
    title: 'June 7, 2018',
    image:
      'images/mattsupdates/34685215_10216699277982516_8546183851804721152_n.jpg',
    blurb:
      'Honored to represent Indiana, and the United States of America, by praying at the Jerusalem Prayer Breakfast this morning. #AllGloryToGod #Pray4Leaders #Humbled',
  },
  {
    title: 'May 31, 2018',
    image:
      'images/mattsupdates/33943928_10216648299068075_4033642600740159488_n.jpg',
    blurb:
      'BREAKING: Tomorrow morning a delegation of 16 Hoosiers set out on an adventure to Israel. Legislators, pastors, support staff, and family members will leave for the second annual Jerusalem Prayer Breakfast to be held next week. The Israeli Knesset has invited us to participate along with hundreds of other leaders from around the world! Please be praying for us! Thank you #Pray4Leaders',
  },
  {
    title: 'May 20, 2018',
    image:
      'images/mattsupdates/32974729_10216570876372556_19232416874889216_o.jpg',
    blurb:
      'Wow! This past week it was Knightstown, Indy, Tipton, Wabash, Clay City, Indy and Middlebury. In that order. Now to plan for Israel in a couple weeks. Please be praying for us! (Can you guess which town this pic is from?) #Pray4Leaders #ILoveIndiana #Thanks',
  },
  {
    title: 'May 17, 2018',
    image:
      'images/mattsupdates/32672407_10216549761884707_2027317330710626304_o.jpg',
    blurb:
      "Privileged to preach in 'The Mayberry of the Midwest,' Clay City, IN this evening! #ILoveIndiana",
  },
  {
    title: 'March 28, 2018',
    image:
      'images/mattsupdates/29662388_10216169327614088_4298210397240592076_o.jpg',
    blurb:
      "20 years ago Miriam married a landscaper with a rather simple life, but some big dreams. (To be clear, I was not a \"dreamy landscaper\" but a landscaper with dreams.) :D Today, with the Lord's help, we have weathered many storms. We've enjoyed triumphs, shed many tears, traveled the world, laughed till we cried, started new ventures, and prayed together through it all. We had no idea where life would take us, but I'm thankful for her willingness to join me in the adventure. I wouldn't want to walk this road with anyone else. Happy 20th Anniversary Miriam! Thanks for making me a better man. #IMarriedUp #TeamMates #Proverbs31 #PrayerPartners — feeling loved.",
  },
  {
    title: 'February 23, 2018',
    image: '',
    blurb:
      'I often wonder when someone will wake me up and say, "Matt, you don\'t belong here." While that is true in so many ways, I\'m thrilled to be on this wild adventure following the Lord wherever He leads! (Picture credit: Todd Scoggins at the Indiana Leadership Prayer Breakfast)',
  },
  {
    title: 'February 19, 2018',
    image:
      'images/mattsupdates/28161828_10215845506558764_7971743676348082744_o.jpg',
    blurb:
      "Pastor Tim Lindsey II opened the Indianapolis City-County Council in prayer this evening. What most people don't know is that he also led a Bible study and prayer time earlier in the evening in the city-county building, before the meeting. It's exciting to see Pastor Lindsey being a pastor to leaders in his city! #Pray4Leaders",
  },
  {
    title: 'January 12, 2018',
    image:
      'images/mattsupdates/26678646_10215505847787507_8304383736074304589_o.jpg',
    blurb:
      "Didn't expect many people at Bible study today, and boy was I surprised! #BigCrowd #HeartyHoosiers #ColdOutsideWarmInside",
  },
  {
    title: 'January 4, 2018',
    image:
      'images/mattsupdates/26172771_10215439527729547_4123516941879163368_o.jpg',
    blurb:
      'Happy Birthday to my best friend. I\'m not sure how she gets younger and I get older! Miriam has stuck with me through thick and thin, through triumphs and trials, through the adventures and the mundane. I\'m reminded of the Scriptural admonition in Proverbs 18:22, "Whoso findeth a wife findeth a good thing, and obtaineth favour of the Lord." #Blessed #Favored #HappyBirthday',
  },
  {
    title: 'January 3, 2018',
    image:
      'images/mattsupdates/26116151_10215436178365815_1797277657692389154_o.jpg',
    blurb:
      'Had an amazing time at the 14th Annual Statehouse Prayer Service today. Special thanks to all who came, prayed, and volunteered to make it a success! #StatehousePrayerService #Pray4Leaders Thanks to Joshua Heaston for the pic too. ',
  },
  {
    title: 'December 31, 2017',
    image: '',
    blurb: 'Happy New Year from the Barnes family! #HappyNewYear',
  },
  {
    title: 'December 8, 2017',
    image:
      'images/mattsupdates/24883273_10215216143665085_4806918135117390156_o.jpg',
    blurb:
      'It is an honor and a privilege to be called to minister in this incredible building. We had a huge crowd for Bible study today too! #PTL #AintGodGoodToIndiana #Pray4Leaders',
  },
  {
    title: 'September 27, 2007',
    image:
      'images/mattsupdates/21992706_10214635648113059_1574882774399615618_o.jpg',
    blurb:
      'Chatted with a living legend today. Lt. Jim Downing is the oldest living survivor of Pearl Harbor (104). While he was on the U.S.S. West Virginia seeing all the horror around him, he said he was at peace because he simply told the Lord, "I\'ll see you in a minute." He will be on the Today Show in the morning. #History #Faith',
  },
  {
    title: 'September 8, 2017',
    image:
      'images/mattsupdates/21457935_10214469725085087_4098019613074525886_o.jpg',
    blurb:
      "On my 40th birthday, I was thrilled to be able to visit the Garden Tomb in Jerusalem. I'm happy to report, it is empty. He is risen!",
  },
  {
    title: 'September 6, 2017',
    image:
      'images/mattsupdates/21318809_10214455168281176_2570031994919771165_o.jpg',
    blurb:
      'Meeting people from many nations and languages here at the "Global Conference of Parliament and Faith" in Jerusalem! #ThankfulForTranslators #TripOfALifetime',
  },
  {
    title: 'September 5, 2017',
    image:
      'images/mattsupdates/21318833_10214446028892697_6197402969921247544_o.jpg',
    blurb:
      'Beyond amazed that I was asked to address an international assembly in the Knesset (Israeli parliament) today! #Pray4Leaders',
  },
]

const ArticleGrid = ({ article }) => (
  <Grid item sm={4}>
    <MediaCard
      title={article.title}
      image={article.image}
      blurb={article.blurb}
    />
  </Grid>
)

const UpdatesFromMatt = () => (
  <Container maxWidth="lg">
    <p></p>
    <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="center"
      spacing={10}
    >
      {db.map((article, i) => (
        <ArticleGrid article={article} key={i} />
      ))}
    </Grid>
  </Container>
)

export default UpdatesFromMatt
