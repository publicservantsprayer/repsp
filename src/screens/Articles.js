import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'


import MediaCard from '../MediaCard'

const db = [
  {
    title: "Fall Banquet",
    image: "https://www.almanac.com/sites/default/files/styles/primary_image_in_article/public/image_nodes/how-do-autumn-leaves-change.jpg?itok=kGiH7Aqg",
    blurb: "Join us to hear what the Lord has done through PSP this past year and where we see Him leading us in the future. There are some exciting developments you will not want to miss!",
  },
  {
    title: "Women's Statehouse Day",
    image: "https://d2g8igdw686xgo.cloudfront.net/14183641_1488832829.1848.jpg",
    blurb: "Women’s Statehouse Day is a very special annual event designed to bring Christian women to their capitol from all over the state of Indiana, to meet their legislators, hear from them, and pray for them.",
  },
  {
    title: "Statehouse Prayer Service",
    image: "https://lakecitysmallgroups.files.wordpress.com/2017/11/prayer-e1510943911313.jpg",
    blurb: "The 15th Annual Statehouse Prayer Service will be held on the first day of the Indiana General Assembly session at noon on Thursday, January 3, 2019.",
  },
  {
    title: "About Us",
    image: "https://images.squarespace-cdn.com/content/v1/55a52fd4e4b037b6dd04e384/1516849619525-SIMH5C28K2UA4M77R4A7/ke17ZwdGBToddI8pDm48kIw2UfM4pFw-uQov_WM0sxJ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UQenKorOgdPvqNz1rrSY2twX-9Ss2mhmBeQBYMjFx-LvtNpR-oeFwj2Ae_lbqFbpxA/3.jpg?format=750w",
    blurb: "Find out our mission statement, what we do, and meet the Team!",
  },
  {
    title: "Women's Ministry",
    image: "https://theprayingwoman.com/wp-content/uploads/2017/01/young-women-praying-1-1068x712.jpg",
    blurb: "There is a breadth and depth to women’s ministry, and none more so than in the political arena.",
  },
  {
    title: "International Prayer with Leaders",
    image: "https://images.squarespace-cdn.com/content/v1/55a52fd4e4b037b6dd04e384/1516730122882-86O0JM8Q0PAKCQIUXHNN/ke17ZwdGBToddI8pDm48kBa9hJZBs0vhP4TILrFPdIZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmEczKEiHaQrO44vfJ0kKvIA2J-j_lQ9JnVm2y0-n2FU57cWDZC5qU3cZuU_QHivgV/21318833_10214446028892697_6197402969921247544_o.jpg?format=2500w",
    blurb: "Getting a chance to pray with leaders around the world",
  },
  {
    title: "PSP Newsletters",
    image: "https://alphaministries.com/wp-content/uploads/2019/04/IMG_0285.jpeg",
    blurb: "Learn the current news on what's going on in PSP",
  },
  {
    title: "What is a Public Servant?",
    image: "https://www.abc.net.au/news/image/9503012-3x2-940x627.jpg",
    blurb: "Develop a more indepth understanding of our ministry",
  },
  {
    title: "Live Prayer Requests From Leaders",
    image: "https://saintmike.com/wp-content/uploads/MilitaryPrayerList1.jpg",
    blurb: "Want to pray more specifically? Here are live prayer requests from our leaders.",
  },
  {
    title: "Changing the tone of politics through prayer",
    image: "https://s3-ap-southeast-2.amazonaws.com/nz.dkhosting.com.au/wp-content/uploads/2017/06/22105108/B17__If-my-people-pray-1024x576.jpg",
    blurb: "Hear encouraging testimonies and find out what others are saying about PSP.",
  },
  {
    title: "Pray, Give, Volunteer",
    image: "https://d3d86zle58b9ct.cloudfront.net/wp-content/uploads/sites/2/2018/06/Praying-hands.jpg",
    blurb: "How can I help? Here are three ways you can give to encourage our leaders.",
  },
]

const Articles = () =>
  <div>
    <h1>Articles</h1>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
          <Grid container direction = "row" justify = "space-evenly" alignItems = "center" spacing = {10}>
            <Grid item sm={4}>
              <MediaCard title={db[0].title} image={db[0].image} blurb={db[0].blurb} />
            </Grid>
            <Grid item sm={4}>
              <MediaCard title={db[1].title} image={db[1].image} blurb={db[1].blurb} />
            </Grid>
            <Grid item sm={4}>
              <MediaCard title={db[2].title} image={db[2].image} blurb={db[2].blurb} />
            </Grid>
            <Grid item sm={4}>
              <MediaCard title={db[3].title} image={db[3].image} blurb={db[3].blurb} />
            </Grid>
            <Grid item sm={4}>
              <MediaCard title={db[4].title} image={db[4].image} blurb={db[4].blurb} />
            </Grid>
            <Grid item sm={4}>
              <MediaCard title={db[5].title} image={db[5].image} blurb={db[5].blurb} />
            </Grid>
            <Grid item sm={4}>
              <MediaCard title={db[6].title} image={db[6].image} blurb={db[6].blurb} />
            </Grid>
            <Grid item sm={4}>
              <MediaCard title={db[7].title} image={db[7].image} blurb={db[7].blurb} />
            </Grid>
            <Grid item sm={4}>
              <MediaCard title={db[8].title} image={db[8].image} blurb={db[8].blurb} />
            </Grid>
            <Grid item sm={4}>
              <MediaCard title={db[9].title} image={db[9].image} blurb={db[9].blurb} />
            </Grid>
            <Grid item sm={4}>
              <MediaCard title={db[10].title} image={db[10].image} blurb={db[10].blurb} />
            </Grid>
              </Grid>
      </Container>
    </React.Fragment>
  </div >

export default Articles
