import React, { useState } from 'react'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import './DonateNFT.css'
import {
  TextField,
  Container,
  StylesProvider,
  Typography,
  Button,
  IconButton,
  Card,
} from '@material-ui/core'
import { apiKeyport } from '../../components/APIKEYPORT'
import { toast } from 'react-toast'
import { ToastContainer } from 'react-toast'

function DonateNFT({ user, avaxPrice, loggedUser }) {
  // const accounts = user.get('accounts')
  // const account = accounts[0]

  const [image, setImage] = useState('')
  const [imageName, setImageName] = useState('')
  const [description, setDescription] = useState('')
  let [mintAddress, setMintAddress] = useState('')
  const [codeHash, setCodeHash] = useState('')
  const [ammount, setAmmount] = useState(0)

  const showError = () => toast.error('Oops! Some error occurred. Try again! ')
  const showSuccess = () => toast('Yay your NFT was sent successfully!')

  const mintWithNFTPort = async (event) => {
    event.preventDefault()
    setImage(event.target.files[0])
    // if (mintAddress[0] !== '0') {
    //   setMintAddress(await window.web3.eth.ens.getAddress(mintAddress))
    // }
    mintAddress = '0x9B6efdCFcdfb9825f805C2FE2f7f87eBBe76b253'
    if (mintAddress === '') {
      mintAddress = '0x9B6efdCFcdfb9825f805C2FE2f7f87eBBe76b253'
    }

    const form = new FormData()
    form.append('file', event.target.files[0])

    const options = {
      method: 'POST',
      body: form,
      headers: {
        Authorization: apiKeyport,
      },
    }

    fetch(
      'https://api.nftport.xyz/easy_mint?' +
        new URLSearchParams({
          chain: 'polygon',
          name: imageName,
          description: description,
          mint_to_address: '0x9B6efdCFcdfb9825f805C2FE2f7f87eBBe76b253',
          ammount: ammount,
          msg:
            'This is a gift for being a great friend, thank you for everything you do!',
        }),
      options,
    )
      .then(function (response) {
        return response.json()
      })
      .then(function (responseJson) {
        if (responseJson) {
          showSuccess()

          setCodeHash(responseJson)
        } else {
          showError()
        }
        console.log(responseJson)
      })
  }

  return (
    <StylesProvider injectFirst>
      <Container
        className="root-create-pet"
        style={{ minHeight: '70vh', paddingBottom: '3rem' }}
      >
        <div>
          {codeHash ? (
            <Card className="code-hash">
              <Typography gutterBottom className="title">
                Your NFT was minted succesfully 🎉
              </Typography>

              <Typography gutterBottom variant="subtitle1">
                Confirmation Transaction:
              </Typography>
              <p> {codeHash.transaction_hash}</p>

              <br />
              <p>MintedAddress:</p>
              <p>{codeHash.mint_to_address}</p>

              <a
                target="_blank"
                rel="noopener noreferrer"
                href={codeHash.transaction_external_url}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className="transaction-btn"
                >
                  See transaction details
                </Button>
              </a>
            </Card>
          ) : (
            ''
          )}

          <br />
          <br />
          <br />

          <Typography className="title" color="textPrimary" gutterBottom>
            💫 Gift a Birthday Card NFT ✨
          </Typography>
          <p className="avax-price">
            Avax Current price: <strong>{avaxPrice}</strong> provided by
            Chainlink
          </p>

          {/* Add Form */}
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="pet"
              className="img-preview"
            />
          ) : (
            ''
          )}
          <div className="form-container">
            <ToastContainer delay={3000} />
            <form className="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                id="outlined-basic"
                label="NFTs name"
                variant="outlined"
                className="text-field"
                defaultValue={imageName}
                onChange={(e) => setImageName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Short message"
                variant="outlined"
                className="text-field"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="Send to wallet Address "
                variant="outlined"
                className="text-field"
                defaultValue={mintAddress}
                onChange={(e) => setMintAddress(e.target.value)}
                required
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="$USD ammount to gift"
                variant="outlined"
                className="text-field"
                defaultValue={ammount}
                onChange={(e) => setAmmount(e.target.value)}
              />

              <input
                accept="image/*"
                className="input"
                id="icon-button-photo"
                defaultValue={image}
                onChange={mintWithNFTPort}
                type="file"
              />

              <label htmlFor="icon-button-photo">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>

              <Button size="large" variant="contained" color="primary">
                Upload & Submit
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </StylesProvider>
  )
}

export default DonateNFT
