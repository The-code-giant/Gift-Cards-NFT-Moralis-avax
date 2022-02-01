import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import Home from './components/home/Home'
import Projects from './components/home/Projects'
import LoadingPage from './components/home/loadin-page/LoadingPage'
import PetDetails from './components/home/pet-details/PetDetails'
import PageCommunity from './components/community/page-community/PageCommunity'
import RegisterCommunity from './components/community/register-community/RegisterCommunity'
import DonateNFT from './components/donate-nft/DonateNFT'
import PlantswapContainer from './components/plantswap/plantswap-container/PlantswapContainer'
import NftTemplates from './components/plantswap/nft-templates/NftTemplates'
import NFTsListByAddress from './components/NFTsListByAddress/NFTsListByAddress'

import Web3 from 'web3'
import BirthdayCard from './abis/BirthdayCard.json'
import { useMoralis } from 'react-moralis'

function App() {
  const [loggedUser, setLoggedUser] = useState('')
  const [contractData, setContractData] = useState('')
  const [randomContract, setRandomContract] = useState('')
  const [avaxPrice, setAvaxPrice] = useState(0)
  const { authenticate, isAuthenticated, user } = useMoralis()
  let currentUser
  useEffect(() => {
    loadWeb3()
    getContract()
  }, [])

  const loadWeb3 = async () => {
    //   if (window.ethereum) {
    //     let user = await Moralis.User.current();
    //     await Moralis.Web3.enable();
    //     let currentAddress = await window.ethereum.send("eth_requestAccounts");
    //     currentAddress = currentAddress.result[0];
    //     if (user && user.attributes.ethAddress == currentAddress) {
    //       return user;
    //     } else {
    //       return await authenticate(provider);
    //     }
    //  } else {
    //   alert("Non ethereum browser")
    //  }

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying Metamask!',
      )
    }
  }

  const getContract = async () => {
    const web3 = window.web3
    // console.log('user insiode getContract', user)
    currentUser = await user?.attributes['ethAddress']

    setLoggedUser(currentUser)
    const networkId = await web3?.eth.net.getId()
    const networkData = BirthdayCard.networks[networkId]

    if (networkData) {
      const abi = BirthdayCard.abi
      const address = BirthdayCard.networks[networkId].address
      const myContract = new web3.eth.Contract(abi, address)
      console.log('getContract ~ myContract', myContract)
      setContractData(myContract)
      let avaxPrice = await myContract.methods.getLatestPrice().call()
      setAvaxPrice(avaxPrice / 10 ** 8)
      console.log('++++++ avaxPrice', avaxPrice / 10 ** 8)
    } else {
      window.alert(
        'Contract is not deployed to the detected network. Connect to the correct network!',
      )
    }
  }

  const connectWallet = async () => {
    await loadWeb3()
    await getContract()
  }

  return (
    <Router>
      <div className="cl">
        {/* <Navbar account={account} connectWallet={connectWallet} /> */}
        <Navbar
          authenticate={authenticate}
          isAuthenticated={isAuthenticated}
          loggedUser={loggedUser}
          user={user}
        />
        <Route exact path="/" component={LoadingPage} />
        <Route exact path="/old" component={Home} />
        <Switch>
          <Route exact path="/donate" component={DonateNFT} />

          <Route exact path="/giftcard">
            <DonateNFT
              user={user}
              avaxPrice={avaxPrice}
              loggedUser={loggedUser}
              contractData={contractData}
            />
          </Route>

          <Route exact path="/create">
            <RegisterCommunity
              loggedUser={loggedUser}
              contractData={contractData}
            />
          </Route>

          <Route exact path="/projects">
            <Projects loggedUser={loggedUser} contractData={contractData} />
          </Route>

          <Route exact path="/collection/wallet-address">
            <NFTsListByAddress
              loggedUser={loggedUser}
              contractData={contractData}
              user={user}
            />
          </Route>

          <Route exact path="/app">
            <LoadingPage loggedUser={loggedUser} contractData={contractData} />
          </Route>

          <Route exact path="/my-collection">
            <PlantswapContainer
              loggedUser={loggedUser}
              contractData={contractData}
            />
          </Route>

          <Route exact path="/nft-templates">
            <NftTemplates loggedUser={loggedUser} contractData={contractData} />
          </Route>

          <Route path="/card-details/:cid">
            <PetDetails
              user={user}
              contractData={contractData}
              randomContract={randomContract}
            />
          </Route>

          <Route path="/project/:projectId">
            <PageCommunity
              loggedUser={loggedUser}
              contractData={contractData}
            />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
