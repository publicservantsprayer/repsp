import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { H2, P } from '../utilities/formating'
import Paper from '@material-ui/core/Paper'

const db = [
  {
    title: 'September 16, 2019',
    image:
      'images/mattsupdates/70781747_10220370992493084_1671149505468170240_o.jpg',
    blurb:
      'Great day over in Illinois! It was an incredible first visit for me to the Illinois Statehouse. Volunteer Chaplain Curt Fleck loves the Lord and is doing great work. Looking forward to seeing how God will use Joshua Engel and Pastor Nick Hardy in the Illinois political arena as well! #ExcitingDay #Pray4Leaders — with Curt Fleck, Joshua Engel and Nick Hardy.',
  },
  {
    title: 'September 6, 2019',
    image:
      'images/mattsupdates/69640656_10220290532241628_4058689368246714368_o.jpg',
    blurb:
      "PRAISE: We have had 2 churches take our ministry on for monthly support this past week! INVITATION: You are invited to join us at our Fall Banquet! It's free, but please register so we know how many to expect. (Link in comments) If you cannot make it, please pray for us. PSP has a national outreach through prayer and the website, as well as a local presence through volunteer chaplaincies and pastoral care. This year we celebrate 15 years of God's faithfulness to us! Many people do not realize we are volunteers and do not receive any funds from the state or government. We initiated this Fall Banquet three years ago to give a report on our year and invite our friends to participate in this incredible ministry to political leaders. We are so grateful for your faithful prayers and support. #Pray4Leaders",
  },
  {
    title: 'August 26, 2019',
    image:
      'images/mattsupdates/69874264_10220203466065028_2749396127391416320_o.jpg',
    blurb:
      'My lovely wife went with me to the Statehouse today. Jessica Ray caught a nice impromptu pic of the two of us. I\'m so thankful for a partner who puts up with all of my crazy ideas! You could probably caption this with me saying "Hey honey, I\'ve been thinking..." :) #Thankful #SheIsAmazing',
  },
  {
    title: 'August 19, 2019',
    image:
      'images/mattsupdates/69176889_10220143505006039_1921707366257000448_o.jpg',
    blurb:
      'Good morning! If you work in or around the Statehouse, please consider joining us for a short prayer time to start your week. Every Monday morning from 8:00-8:15 in the chapel room 432. #Pray4Leaders',
  },
  {
    title: 'August 13, 2019',
    image:
      'images/mattsupdates/69150923_10220096702396003_1048847192825004032_o.jpg',
    blurb:
      'Our new home at Fairhaven is coming along! 3 years of waiting is hopefully ending in the next few months. If you know how to drywall, please let me know!',
  },
  {
    title: 'August 12, 2019',
    image:
      'images/mattsupdates/67914161_10220088908401158_2991195772474621952_o.jpg',
    blurb:
      "I was honored to be asked to open the Madison County Commissioners' meeting in prayer this evening. I could've left right after the prayer but chose to stay through to the end. I'm glad I did. There was tension and contention. They needed prayer through the entire meeting. Government meetings are public and almost entirely devoid of people simply there to pray for leaders and their decisions. I'm so thankful for pastors across our great state who are going to their local government meetings once a month to learn how to pray for their leaders. I know of 5 pastors doing that so far. We need at least 87 more!! Let me or pastor Tim Lindsey II know if you want to go. #92Counties #WillYouGo #WillYouPray #YouAreNeeded #ILoveIndiana #Pray4Leaders",
  },
  {
    title: 'August 10, 2019',
    image:
      'images/mattsupdates/67749004_10220072718716426_8248293961060319232_o.jpg',
    blurb:
      'Matt Barnes, Pam Russell and Jessica Ray with Bobby Little who leads many Bible studies on Capitol Hill and throughout Washington D.C.',
  },
  {
    title: 'August 5, 2019',
    image:
      'images/mattsupdates/67684565_10220033044844604_6592482148878385152_o.jpg',
    blurb:
      "It was so thrilling to me to see the way that Pastor Bryan Ries is interacting with his leaders in the city of Franklin, IN. It was also nice to meet the mayor, as his team has asked me to speak at the Mayor's Prayer Breakfast in Franklin next month. God is doing some amazing things in the political arena! #KeepPraying #Pray4Leaders",
  },
  {
    title: 'July 27, 2019',
    image:
      'images/mattsupdates/67507332_10219958783388114_798341528773722112_n.jpg',
    blurb:
      "Rep. Vernon G Smith meeting the First Lady of Ghana at the President's House in Accra, Ghana, West Africa last year after we attended the funeral of former Secretary General of the United Nations, Kofi Annan.",
  },
  {
    title: 'June 7, 2019',
    image:
      'images/mattsupdates/61938653_10219555716551695_232909290413752320_o.jpg',
    blurb:
      'Rep. Chuck Goodrich participating in the Jerusalem Prayer Breakfast. More than 65 nations were represented at the event — with Chuck Goodrich.',
  },
  {
    title: 'June 7, 2019',
    image:
      'images/mattsupdates/62017011_10219555715991681_189096758523985920_o.jpg',
    blurb:
      'Rep. Mike Speedy reads from Scripture at the Jerusalem Prayer Breakfast.',
  },
  {
    title: 'June 7, 2019',
    image:
      'images/mattsupdates/62458756_10219555715391666_506837090462334976_o.jpg',
    blurb:
      'Rep. Randall Frye received a hug from Rabbi, and former Member of the Israeli Knesset, Yehuda Glick after Rep. Frye read Scripture at the Jerusalem Prayer Breakfast. — with Randall Frye.',
  },
  {
    title: 'June 7, 2019',
    image:
      'images/mattsupdates/62112226_10219555714871653_2807336035078373376_o.jpg',
    blurb:
      'Rep. Mike Speedy and Sen. Victoria Spartz chat with Member of the Israeli Knesset, Robert Ilatov.',
  },
  {
    title: 'May 14, 2019',
    image:
      'images/mattsupdates/62012443_10219555717031707_7429159868541435904_o.jpg',
    blurb:
      'Pamela Russell, Matthew Barnes, Member of the Russian Parliament Garik Kurginian, Marina and Luciano Bongarra, and Eric Turner at the 4th biennial Global Conference of Parliament and Faith in Brazil in May 2019.',
  },

  {
    title: 'April 24, 2019',
    image:
      'images/mattsupdates/58079844_10219220636694908_7890688133522522112_o.jpg',
    blurb:
      'The Indiana General Assembly has adjourned, Sine Die! My 15th session was a momentous one in many ways. There were sad moments, happy moments, funny moments, and many ministry moments. It is an honor to serve as a chaplain in the political arena. So thankful to our team, my family, and the Lord for all the support. #ILoveIndiana #Pray4Leaders #LateNightSessionDays #IndianaStatehouse — with Jessica Ray and Pamela Russell.',
  },
  {
    title: 'April 23, 2019',
    image:
      'images/mattsupdates/58463172_10219210654205352_4103960973541376000_o.jpg',
    blurb:
      'There are some people who just make life better. Jack Reid is one of those people. He and I have spent countless hours talking on the fourth floor of the Statehouse. He was the Statehouse electrician for nearly 3 decades and has been a doorman for nearly 20. Almost 50 years of service to the state of Indiana! He is retiring tomorrow and Senator Merritt recognized him today in the Senate. #Inspiration #AFewGoodMen #ILoveIndiana #ILoveHoosiers',
  },
  {
    title: 'April 19, 2019',
    image:
      'images/mattsupdates/57226287_10219180389248747_6055731985588944896_o.jpg',
    blurb:
      'I\'m thankful for the ultimate Power Source who died on a cross to give me light and life! "And Jesus came and spake unto them, saying, All power is given unto me in heaven and in earth." Matthew 28:18 #PowerLine #Transformer #GoodFridayWasGoodForMe #SundaysComing #VictoryOverDeath',
  },
  {
    title: 'April 11, 2019',
    image:
      'images/mattsupdates/57168291_10219125439035026_6198188865316978688_o.jpg',
    blurb: '',
  },
  {
    title: 'April 11, 2019',
    image:
      'images/mattsupdates/57038391_10219125434154904_7160643963509014528_o.jpg',
    blurb: '',
  },
  {
    title: 'April 11, 2019',
    image:
      'images/mattsupdates/56931927_10219125436714968_3394588322209726464_o.jpg',
    blurb: '',
  },
  {
    title: 'April 11, 2019',
    image:
      'images/mattsupdates/56922681_10219125328392260_7101523145974087680_o.jpg',
    blurb: '',
  },
  {
    title: 'April 11, 2019',
    image:
      'images/mattsupdates/56770639_10219125440715068_7876336203950194688_o.jpg',
    blurb: '',
  },
  {
    title: 'April 11, 2019',
    image:
      'images/mattsupdates/56770587_10219125330832321_8292690784596000768_o.jpg',
    blurb: '',
  },
  {
    title: 'April 11, 2019',
    image:
      'images/mattsupdates/56764531_10219125436154954_2455863803091353600_o.jpg',
    blurb: '',
  },
  {
    title: 'April 11, 2019',
    image:
      'images/mattsupdates/56696919_10219125314911923_5588129533044719616_o.jpg',
    blurb: '',
  },
  {
    title: 'April 11, 2019',
    image:
      'images/mattsupdates/56691388_10219125331112328_7154194979919757312_o.jpg',
    blurb: '',
  },
  {
    title: 'April 11, 2019',
    image:
      'images/mattsupdates/56679493_10219125433674892_209715449108103168_o.jpg',
    blurb: '',
  },
  {
    title: 'April 11, 2019',
    image:
      'images/mattsupdates/56664640_10219125324952174_7615899368624750592_o.jpg',
    blurb: '',
  },
  {
    title: 'April 11, 2019',
    image:
      'images/mattsupdates/56659861_10219125305951699_768933823273500672_o.jpg',
    blurb: '',
  },
  {
    title: 'April 11, 2019',
    image:
      'images/mattsupdates/56649365_10219125437674992_5865908686102200320_o.jpg',
    blurb: '',
  },
  {
    title: 'April 11, 2019',
    image:
      'images/mattsupdates/56627538_10219125433034876_3597643037250945024_o.jpg',
    blurb: '',
  },
  {
    title: 'April 11, 2019',
    image:
      'images/mattsupdates/56691310_10219125396113953_6075949689436372992_o.jpg',
    blurb:
      'I was honored to emcee the 2019 Indiana Leadership Prayer Breakfast! Special thanks to my favorite professional photographer, Sarah Barnes! — with Ryan Lauer and Eric J. Holcomb.',
  },
  {
    title: 'April 1, 2019',
    image:
      'images/mattsupdates/55869086_10219046322817170_4460002475205722112_o.jpg',
    blurb:
      "We had a wonderful anniversary weekend! Harry and Izzy's, Hilbert Circle Theater, ISO, Indy Eleven home opener at Lucas Oil, and church in Greenfield. Thrilled to continue life with my best friend! #ILoveIndy #ILoveIndiana",
  },
  {
    title: 'March 19, 2019',
    image:
      'images/mattsupdates/54277743_10218958451380439_5442710457322307584_o.jpg',
    blurb:
      "Tough evening, but an incredibly God honoring funeral service. Bradly impacted many people. I was honored to emcee and give a few remarks at the funeral this evening. Bradly's race is done. Who will pick up the torch and share the love of Jesus the way he did? Special thanks to Ryan Mangus, Pamela Russell, Mike Woods, Timothy Wesco, Tim Lindsey II, Tim Overton, Cindy Meyer Ziemke, and others! Please keep praying for Bradly's family and friends.",
  },
  {
    title: 'March 4, 2019',
    image:
      'images/mattsupdates/53340195_10218847593329057_3659320777666199552_o.jpg',
    blurb:
      'I was honored to receive a special gift from Sen. Jack E Sandlin today. (Yes, I think this was in response to my head injury last week.) It might not be the helmet of salvation, but it is a helmet of protection! #HardHead #HardHat #Thanks — with Jack E Sandlin.',
  },
  {
    title: 'February 14, 2019',
    image:
      'images/mattsupdates/52286656_10218700019399801_6784500640509853696_n.jpg',
    blurb:
      'It was my high honor to celebrate Black History Month in style. Special thanks to Rep. Dr. Vernon G Smith for the special garb he picked out for me when we traveled together to Ghana a few months ago! #Blessed #ILoveIndiana',
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49300526_10218399808734722_7797861005354074112_o.jpg',
    blurb: 'Matthew Barnes',
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49717420_10218399808214709_890308413647486976_o.jpg',
    blurb: '800+ Hoosiers gathered for prayer at the Indiana Statehouse!',
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49300572_10218399807494691_7275261616843653120_o.jpg',
    blurb:
      'Pastor Kelly Barnes closed in prayer and had everyone join in saying Praise the Lord together. It was a fitting, resounding finale to the service.',
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49485838_10218399806774673_4808101044741472256_o.jpg',
    blurb:
      "Governor Eric J. Holcomb prayed for Indiana's Executive Branch of government. — with Eric J. Holcomb.",
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49635259_10218399805814649_7962403581875716096_o (1).jpg',
    blurb:
      'Senate President Pro Tem. Rod Bray prayed for the 50 members of the Indiana Senate.',
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49449304_10218399805414639_1631685297253122048_o.jpg',
    blurb:
      'Speaker of the House Brian Bosma prayed for the 100 members of the Indiana House. — with Brian Bosma.',
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49723933_10218399804974628_8223362311562199040_o.jpg',
    blurb:
      'David Lusan prayed for the support staff and advocates in the Statehouse.',
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49519680_10218399804454615_3339725359158394880_o.jpg',
    blurb: 'With Brandon J. Smith.',
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49947394_10218399804014604_7637265400698241024_o.jpg',
    blurb:
      'Indiana Supreme Court Justice Loretta Rush prayed for the judiciary.',
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49644337_10218399803494591_4440494055142457344_o.jpg',
    blurb: 'With Maggie A. Lewis.',
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49498817_10218399803134582_6185912976906649600_o.jpg',
    blurb: 'With Tim Brown.',
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49402064_10218399802414564_4278605283078438912_o.jpg',
    blurb: 'With Vernon G Smith.',
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49467910_10218399801814549_2008734909891346432_o.jpg',
    blurb: 'Senator Dennis Kruse prayed for Indiana teachers and students.',
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49805618_10218399801094531_3516780657177001984_o.jpg',
    blurb: 'With Darryl Webster.',
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49585669_10218399800654520_6204478381065502720_o.jpg',
    blurb: 'With Kelly Mitchell.',
  },
  {
    title: 'January 7, 2019',
    image:
      'images/mattsupdates/49895492_10218399800094506_735379004726444032_o.jpg',
    blurb:
      "Prayer in the Governor's office with each participant before the 15th Annual Statehouse Prayer Service. With Aaron Gray, Josh M Arnett and Pamela Russell.",
  },
  {
    title: 'December 17, 2018',
    image:
      'images/mattsupdates/48363893_10218241659141081_3648880184616026112_o.jpg',
    blurb:
      '"Dawn\'s early light." Time for prayer every Monday morning in the Statehouse chapel from 8:00-8:15 a.m. #Pray4Leaders #EveryoneWelcome',
  },
  {
    title: 'December 3, 2018',
    image:
      'images/mattsupdates/47325079_10218137606579832_2383256792541954048_o.jpg',
    blurb:
      'Praying for leaders before the Indianapolis City-County Council meeting this evening. #Pray4Leaders — at Indianapolis City-County Building.',
  },
  {
    title: 'November 22, 2018',
    image:
      'images/mattsupdates/46510526_10218053194629586_5234192780103778304_o.jpg',
    blurb:
      "Happy Thanksgiving from the Barnes family! Even if you are from Argentina, it's a good day to be thankful! I'm thankful for a family that has a heart for the entire world. We were grateful to have Luciano Bongarra recently stay at our home. #Thanksgiving",
  },
  {
    title: 'November 16, 2018',
    image:
      'images/mattsupdates/46322743_10217998584544368_1489814951143931904_o.jpg',
    blurb:
      'I love delivering Bibles into the Indiana Statehouse. Thanks to all who contribute to our Bible fund and make this possible! #Pray4Leaders',
  },
  {
    title: 'November 10, 2018',
    image:
      'images/mattsupdates/45831689_10217952665676425_1547884450879111168_o.jpg',
    blurb:
      "14 years ago I was working at Home Depot and begging God to give me more to do. In the Fall of 2004 I heard a sermon addressing the need to pray for leaders. I took the message literally and asked Miriam about quitting my job and going into the Statehouse to start a ministry. She agreed and Public Servants' Prayer was born! I didn't realize all that would transpire with that simple act of \"getting out of the van\", but by God's grace and your help we are starting our 15th year of ministry in the political arena! I'm grateful for my family. I know it hasn't been easy these past 14 years. I love you. Thanks to all of you for praying for us, encouraging us, and supporting us over the years. We couldn't do what we do without you! Thanks to Dan Elkins for always designing such great prayer cards as well!",
  },
  {
    title: 'October 29, 2018',
    image:
      'images/mattsupdates/45035641_10217857165568982_7840056636675719168_o.jpg',
    blurb:
      'Honored to open the Indianapolis City-County Council this evening in prayer. Special thanks to my City-County Council Susie Lyons Cordi for the invitation. Thanks to Chaplain Tim Lindsey II for the picture. Here is a portion of my prayer -"Our hearts are heavy with the devastating news of our fellow citizens who have experienced the face of evil in Pittsburgh on this past Jewish Shabbat. We know we live in a broken world, and we ask You for healing; healing for the hearts that are grieving, healing for the bodies that are hurting, and healing in hearts that are so full of hate. This seems impossible, but You are the God Who can do the impossible." #PrayForPittsburgh #Pray4Leaders',
  },
  {
    title: 'October 17, 2018',
    image:
      'images/mattsupdates/44407259_10217773036145799_2855843245395542016_o.jpg',
    blurb:
      'This is the start of a house that we will live in and use for ministry to leaders and staff in the capitol and the political arena. God called us to sell our dream house 2 years ago and move to Indy to fulfill the command in Scripture that pastors are to be "given to hospitality." We lived too far away to truly be hospitable to the people we are called to minister to. 2 years and the dream is becoming a reality! Please pray for our efforts 1 Timothy 3:2',
  },
  {
    title: 'October 5, 2018',
    image:
      'images/mattsupdates/43188573_10217665870426723_643478696140734464_o.jpg',
    blurb:
      '8:00 a.m. yesterday I was invited by Rep. Terri Jo Austin to speak and pray with a group in the Anderson City Hall. Today at 8:00 a.m. I was praying with some folks in the Indiana Statehouse. #ILoveIndiana #Pray4Leaders',
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
    image:
      'images/mattsupdates/28423807_10215874834371941_4154747561410519202_o.jpg',
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
    image:
      'images/mattsupdates/26173724_10215408630797143_2371375184594758523_o.jpg',
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
    title: 'September 27, 2017',
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
  {
    title: 'September 4, 2017',
    image:
      'images/mattsupdates/21317627_10214432340030484_1052385060644487151_n.jpg',
    blurb:
      'What an honor to kick off the "Global Conference of Parliament and Faith" in Jerusalem. #TripOfALifetime #Pray4Leaders',
  },
]

const ArticleGrid = ({ article }) => (
  <Grid item sm={4}>
    <Paper>
      <Box maxWidth={400} height="auto" mx={2} my={2} px={2} py={2}>
        <Box>
          <H2>{article.title}</H2>
        </Box>
        <Box>
          <img style={{ width: '100%' }} src={article.image} />
        </Box>
        <Box>{article.blurb}</Box>
      </Box>
    </Paper>
  </Grid>
)

export default () => (
  <Container maxWidth="lg">
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
