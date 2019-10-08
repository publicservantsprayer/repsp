import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { H1, P } from '../utilities/formating'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

const WhyWePray = () => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs></Grid>
      <Grid item xs={10} sm={8}>
        <H1>Why we pray</H1>
        <P>
          Our country's political leaders, from the 532 members of the US
          Congress to the thousands at the state level, are faced with difficult
          decisions every day in addition to balancing their personal lives with
          family and friends.
        </P>
        <P>
          Too often, it’s easy to forget about the person behind the political
          decisions they make. But if we take a moment to remember their
          humanity, it allows us to see each one as a child of God who needs
          prayer just like you and I.
        </P>
        <h1>Why We Pray - An In Depth Look</h1>
        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>PRAYER</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <p>
                  Prayer is the essential ingredient of gospel-centered
                  influence. Prayer for leaders is a command given by God to His
                  people. Multiple times throughout the Old Testament, we see
                  men and women of God praying for their leaders. Jeremiah lays
                  out the case to pray for the peace of Babylon, because that’s
                  where the Israelites were headed. Daniel prayed for the kings
                  he served. Esther fasted and prayed for days before she went
                  before the king to influence him. Prayer recognizes that God
                  has the foremost influence, for He holds the heart of the king
                  in His hand (Proverbs 21:1.) Therefore, every believer has a
                  direct line to the King of Kings, who governs the entire
                  world. Even Nebuchadnezzar admitted that the King of Kings,
                  “...rules in the affairs of men.”
                </p>
                <p>
                  So believer, how do you pray for those in authority?
                  Thankfully the Lord has given us a list. 1 Timothy 2:1-4 lays
                  out four ways we can pray for our leaders.
                </p>
                <h3>First is thanksgiving</h3>
                <p>
                  Let’s discuss giving thanks first. Truly, prayer is not only
                  about asking for what we desire. In fact, as we think of
                  prayer and ultimately influencing the heart of God, giving
                  thanks is one of the key elements. It is extremely difficult
                  for the believer to thank God for leaders they don’t like or
                  don’t agree with, yet it is a direct command to thank God for
                  those in authority over us. This command wasn’t given to
                  believers in a time of Christian prosperity, but rather in a
                  time of dictatorship, tyranny, and persecution, and it still
                  holds true today. We are required to give thanks for the
                  leaders God has given us.
                </p>
                <h3>Second is intercession</h3>
                <p>
                  Intercessory prayer is praying on behalf of someone. This
                  certainly should be the case for Christians. Our leaders may
                  in fact, not know how to pray, so we stand in their place and
                  lift them up. There is an old story that one of our retired
                  legislators tells as true - A Democrat and a Republican were
                  walking in the halls of the Statehouse. (Contrary to popular
                  belief, Democrats and Republicans do talk to one another.) The
                  Democrat turned to the Republican and said, “You Republicans
                  wave the banner of Christianity and say that God is on your
                  side...I would bet that you don’t even know the Lord’s
                  Prayer!” The Republican was aghast and replied, “Of course I
                  do!” The Democrat responded, “I bet you $20, that you cannot
                  recite the Lord’s Prayer right now!” The Republican accepted
                  the challenge, and in the halls of the capitol building, he
                  quite piously and reverently bowed his head and commenced
                  reciting the Lord’s Prayer. “Now I lay me down to sleep, I
                  pray the Lord my soul to keep…” When he was finished, the
                  Democrat looked at him and admitted, “I didn’t think you could
                  do it,” and handed him the money.
                </p>
                <p>
                  While this is a funny story, and not likely true, the fact is
                  that while there are many leaders who are praying believers,
                  there are numerous ones who do not know how to pray, and have
                  not received the gift of Jesus. Thus the primary prayer for
                  legislators does not concern legislation, but salvation. This
                  is real intercession.
                </p>
                <h3>Third is prayer</h3>
                <p>
                  Prayer is petition. It’s much more than simply asking for what
                  we want though. Prayer is communication. It is the telephone
                  line between us and God. We talk to Him and He responds
                  through His Holy Spirit and the Word of God. Communicating
                  through prayer centers us on what is truly important.
                </p>
                <p>
                  When we pray for those in authority, we are actually giving a
                  gift to them. Proverbs 18:16 says, “A man’s gift maketh room
                  for him and bringeth him before great men.” As we think of
                  influence, we naturally think of giving a gift. This is often
                  done on a carnal level. “Mr. Worldy-wise” will tell you to
                  gain influence by giving money and gifts and similar material
                  wealth. Although we, as believers, shun bribery, there is a
                  principle of gift-giving in Scripture that is healthy. If we
                  want a seat at the table of influence, at the “city gates”, or
                  at the city council meeting, for example, we have a far more
                  powerful gift to give - the gospel. Again we want to influence
                  them for the cause of the gospel, so the first thing we do is
                  to take time out of our schedule to pray for them. This is a
                  tremendous gift of time and effort, and this gift is providing
                  prayer warriors around the world a seat at the table of
                  influence.
                </p>
                <h3>Last is Supplication</h3>
                <p>
                  Supplication has the implication of begging or earnestly
                  beseeching. As we think of begging God, certainly on behalf of
                  our nation, we remember the example of Nehemiah who begged God
                  to work on his nation’s behalf. These four influential types
                  of prayer make a nice acronym: Thanksgiving, Intercession,
                  Prayer, and Supplication, or TIPS for “peace and quiet”(I
                  Timothy 2:2.)
                </p>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>PRACTICE</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <p>
                  How can churches actively practice praying for our leaders? We
                  need to make it a part of our corporate worship as well as a
                  part of our daily prayer lives. In Paul’s letter to Timothy (I
                  Timothy 2:1) he urges us to pray for our leaders, “first of
                  all”, implying that we are to make it a priority. Prayer for
                  our leaders has been written in many of the rote prayers
                  throughout church history. Our forefathers prayed for their
                  leaders. It was a regular part of their worship. In contrast,
                  many of the modern era churches do not encourage praying for
                  our authorities. Yet it’s something that Paul asserts needs to
                  be a priority. So make it a priority in your personal and
                  corporate worship and prayer groups. Pray for those in
                  authority, specifically those in civil government.
                </p>
                <p>
                  Another practical piece that is often overlooked is to let
                  your authorities know that you’re praying for them. Send them
                  a note, an email, a Facebook Post, or call them and let them
                  know you, your church, or your small group has been praying
                  for them. You’ll be surprised at the impact this makes. Again,
                  we’re talking about gospel-centered influence. As you pray for
                  someone, God influences their heart. When you let them know
                  you’re praying for them, you begin to have influence in their
                  life because you’re communicating your care for them.
                </p>
                <p>
                  When you begin communicating with your leaders, the next
                  practical step will come naturally: Ask them how you can pray
                  for them. This question will prompt many different responses
                  from political leaders. If it’s someone you don’t know well
                  yet, they may give you a general prayer request. However, as
                  you persist in prayer, persist in letting them know, and
                  persist in asking how you can pray for them, trust and
                  influence will begin to build. The old maxim suggests, “People
                  don’t care how much you know until they know how much you
                  care.” So just continue to faithfully pray, regularly let them
                  know you’re praying, and ask them how you can pray for them.
                </p>
                <p>
                  The last practical step is to simply follow-up. Pray, let them
                  know, ask how you can pray for them, and then follow-up on
                  those prayer requests. Has there been resolution on that
                  request? How is God working? Or maybe the situation is still
                  on-going and you let them know you’re still praying for that
                  particular prayer request. These four practical ways are
                  simple but vital in building gospel-centered influence in the
                  lives of leaders.
                </p>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>PERCEPTION</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <p>
                  The testimony of the believer is critical in changing the
                  heart of leaders toward the Gospel. 1 Peter 2:17 encourages us
                  in this, “Having your conversation honest among the Gentiles,
                  that whereas they speak against you as evildoers, they may by
                  your good works, which they shall behold, glorify God in the
                  day of visitation.” This clearly indicates that our behavior
                  and testimony should be such that others see our actions and
                  are drawn to the Lord.
                </p>
                <p>
                  Having ministered in the capitol building since 2004, I have
                  unfortunately seen believers act in ways that aren’t
                  Christlike. Near the beginning of our ministry, one legislator
                  even told me that Christians could be some of the
                  meanest-spirited people in the world, and I’ve regrettably
                  seen emails that can attest to this fact. Here is a prime
                  example. Several years ago, I was walking with a legislator
                  through the Statehouse when two women came up to us and began
                  to discuss a particular issue. They were quite passionate
                  about this issue. They were dressed conservatively and
                  appeared to be church ladies, but as they began to talk and
                  get worked up about their cause, they sounded like anything
                  but Christians. The legislator that was with me had to excuse
                  himself to get to a meeting and that left me there to finish
                  listening to the ladies. I was unable to get a word in
                  edgewise as they continued with their vehement diatribe. They
                  finally slowed down enough to ask me what legislative district
                  I represented. I told them I was just the chaplain at the
                  Statehouse. They were surprised and embarrassed as their
                  language had become quite salty and derogatory the more
                  fervent they became about their issue. I believe they realized
                  too late that they had not been representing Christ in a way
                  that was honoring to Him. I tell this story to remind us that
                  as we attempt to influence those in power, it’s easy for
                  Christians to think that we can influence in our flesh, and
                  neglect the power of prayer. (“Not by might, nor by power, but
                  by my Spirit, saith the Lord of hosts.” Zech 4:6) If we
                  believe Proverbs 21:1, then our first response should be
                  prayer. That should further inform how we communicate. Let us
                  not allow the fear of the world’s power to shake our faith. We
                  know the God of the universe Who’s ultimately in charge. So
                  then, our most powerful gospel-centered influence is through
                  prayer, to influence the power of God, to work on the hearts
                  of powerful people.
                </p>
                <p>
                  Many civil government leaders don’t see churches as being
                  beneficial to society as a whole. Local churches need to
                  change this perception. As local leaders often move to higher
                  offices, it behooves local churches to impact these local
                  leaders with gospel-centered influence early in their public
                  service. If followers of Christ are purposeful about the
                  practical steps of gospel-centered influence at the local
                  levels, leaders’ perception of our churches can shift
                  entirely. Simply start by making prayer for leaders a priority
                  in your church. Follow up your prayers by finding out the
                  prayer needs of your local government officials. As you pray
                  for them, God will give you a heart to love them. Find out how
                  you can pray for them and minister to them. Attend a city hall
                  meeting to pray and learn about the needs in your community.
                  Reach out to your local city and county officials and find out
                  how you can honor them and pray for them. Put action to your
                  prayers - follow up, meet needs, serve unconditionally. Action
                  should not inspire prayer. Prayer should inspire action.
                </p>
                <p>
                  This plan for gospel-centered influence has the chance to
                  change a nation and indeed the world! It all starts with
                  making prayer a priority in our personal and corporate prayer
                  times. Will you join the paradigm shift from politics to
                  prayer, practice and perception, and thus impact your city,
                  state, nation, and world with the gifts of prayer and pastoral
                  care?
                </p>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  )
}

export default WhyWePray
