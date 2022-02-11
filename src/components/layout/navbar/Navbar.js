import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import VerifiedUserSharpIcon from '@material-ui/icons/VerifiedUserSharp'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'
import { StylesProvider } from '@material-ui/core/styles'
import './Navbar.css'
import logo from '../../../images/logoOfficial.jpg'
import UAuth from '@uauth/js'

export const Navbar = withRouter(({ login, logout, unstoppableName }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  // const [unstoppableName, setunstoppableName] = useState('')
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  // const uauth = new UAuth({
  //   clientID: '0T+orxPyp2ortCaGy4vz9PmBLlft/MzymiWa3LtD05Y=',
  //   clientSecret: 'oBezW7f5/OrgyzwmwljqEU4rJHycww17b9RryazndP8=',
  //   redirectUri: 'https://nft-birthday-cards.netlify.app/callback',
  // })
  // const login = async () => {
  //   try {
  //     const authorization = await uauth.loginWithPopup()
  //     setunstoppableName(authorization.idToken.sub)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  // const logout = () => {
  //   console.log('logging out!')
  //   uauth.logout().catch((error) => {
  //     console.error('profile error:', error)
  //   })
  //   setunstoppableName('')
  // }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <StylesProvider injectFirst>
      <div className="grow">
        <AppBar position="static">
          <Toolbar>
            <Link to="/" className="whiteLink">
              <img src={logo} alt="logo" className="logo" />
            </Link>
            <Link to="/" className="whiteLink">
              <Typography className="title" variant="h6" noWrap>
                NFT_BirthdayCards
              </Typography>
            </Link>

            <Button className="whiteLink" component={Link} to="/">
              Home
            </Button>

            <Button className="whiteLink" component={Link} to="/projects">
              Marketplace
            </Button>

            <Button className="whiteLink" component={Link} to="/my-collection">
              MyCollection
            </Button>

            <Button className="whiteLink" component={Link} to="/create">
              Create
            </Button>

            <Button className="whiteLink" component={Link} to="/giftcard">
              Giftcard
            </Button>

            <div className="grow" />
            <div className="sectionDesktop">
              {unstoppableName ? (
                <>
                  <Button
                    variant="contained"
                    className="connected-btn"
                    endIcon={<VerifiedUserSharpIcon />}
                  >
                    {unstoppableName}
                  </Button>
                  <Button className="whiteLink" onClick={() => logout()}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  className="connected-btn"
                  onClick={() => login()}
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </StylesProvider>
  )
})
