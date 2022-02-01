import React, { useEffect } from 'react'
import { StylesProvider, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './LoadingPage.css'
import students from './images/student.png'
import img1 from './images/icon-online.svg'
import img2 from './images/icon-budgeting.svg'
import img3 from './images/icon-api.svg'
import img4 from './images/icon-online.svg'
import img5 from './images/party.png'
import img6 from './images/party2.jpg'

function LoadingPage({
  account = 0x5df598c222c4a7e8e4ab9f347dcbd924b6458382,
  contractData,
}) {
  useEffect(() => {
    console.log('contractData', contractData)
    const loadCommunity = async () => {
      try {
        // pass the cid
        const cid = 'QmTFaLUesrjbQLKxNszz2DWZ33N9YuGBSVCLpwXnvyiumz'

        let fileData = await fetch(`https://ipfs.io/ipfs/${cid}`)

        const yourData = await fileData.json()
        console.log(yourData)
      } catch (error) {
        console.log(error)
      }
    }
    loadCommunity()

    //
    const getCommunityList = async () => {
      try {
        // gets communityCount from chain
        const count = await contractData.methods.count().call()
        console.log('count', count)

        // gets community data
        const temp = []
        for (let i = count; i >= 1; i--) {
          const community = await contractData.methods.communityList(i).call()
          temp.push(community)
        }
        console.log(temp)

        // setCommunities(temp)
      } catch (error) {
        console.log(error)
        // setLoading(false)
      }
    }
    getCommunityList()
    //
  }, [])

  return (
    <StylesProvider injectFirst>
      <Container>
        <section className="hero" role="banner">
          <div className="container">
            <div className="hero__text container--pall">
              <h2>
                Protect your relationships, memories, and thoughtful messages by
                converting them into NFTs
              </h2>
              <p>
                We help people to protect their Birthday Cards and convert them
                into NFTs through a decentralized and transparent way using
                blockchain technology to document their journey from start to
                finish. No more birthday cards ending up in the trash, with NFT
                Birthday Cards you can collect, create, trade, and sell them.
              </p>
              <Link to="/projects" className="button-gren-padding hero_cta">
                Get Started
              </Link>
            </div>

            <div className="hero__image">
              <img src={img6} alt="" className="student__image" />
            </div>
          </div>
        </section>

        <section className="feature" role="main">
          <div className="feature__content container container--pall">
            <div className="feature__intro">
              <h2>How does it work?</h2>
              <p>
                It's a simple process, just come up with a design/idea, start
                designing, and invite others to sign the birthday card. Make
                your dream come true and let the world discover your talent.
              </p>
            </div>

            <div className="feature__grid">
              <div className="feature__item">
                <div className="feature__icon">
                  <img src={img1} alt="online" />
                </div>
                <div className="feature__title">
                  Share your idea with the world
                </div>
                <div className="feature__description">
                  Share the NFT Birthday Card with that special someone: Share
                  your awesome idea, design, thoughtful message, or good wishes
                  with your loved ones.
                </div>
              </div>

              <div className="feature__item">
                <div className="feature__icon">
                  <img src={img2} alt="budgeting" />
                </div>
                <div className="feature__title">Get a Non Fungible Token</div>
                <div className="feature__description">
                  Register your NFT Birthday Card Each NFT Birthday Card is
                  represented as an NFT that holds your valuable work and ideas.
                </div>
              </div>

              <div className="feature__item">
                <div className="feature__icon">
                  <img src={img3} alt="api" />
                </div>
                <div className="feature__title">
                  {' '}
                  Find contributors, family, and friends.
                </div>
                <div className="feature__description">
                  Invite people, family, friends, and even coworkers to sign up
                  for the birthday card. Anyone can see the NFT birthday card,
                  but only members who are invited can access the NFT.
                </div>
              </div>

              <div className="feature__item">
                <div className="feature__icon">
                  <img src={img4} alt="online" />
                </div>
                <div className="feature__title">Get fund it</div>
                <div className="feature__description">
                  Sell your Designs and get fund it List your NFT template and
                  offer potential deals for users to buy your design.
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </StylesProvider>
  )
}

export default LoadingPage
