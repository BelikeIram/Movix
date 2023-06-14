import React,{useState, useEffect} from 'react'
import './Header.scss'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import MovixLogo from '../../assets/movix-logo.svg'
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from 'react-router';

const Header = () => {
 const [show, setShow] = useState("top"); 
 const [mobileMenu, setMobileMenu] = useState(false)
 const [showSearchBar, setShowSearchBar] = useState(false)
 const [query, setQuery] = useState(false)
 const navigate = useNavigate()
 const location = useLocation()
 const [lastScrollY, setLastScrollY] = useState(0);

 const openSearch = ()=>{
    setMobileMenu(false)
    setShowSearchBar(true)
 }

 const openMobileMenu = ()=>{
    setMobileMenu(true)
 }

 const handleChanges = (event)=>{
    if (event.key === 'Enter' && query.length > 0) {
        navigate(`/search/${query}`)
    }
 }

 const handleExplore = (type)=>{
    if (type === 'movie') {
      navigate(`/explore/movie`)
    }else{
      navigate(`/explore/tv`)
    }
 }

 const controlNavbar = () => {
  if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
          setShow("hide");
      } else {
          setShow("show");
      }
  } else {
      setShow("top");
  }
  setLastScrollY(window.scrollY);

};

useEffect(()=>{
   window.scrollTo(0,0)
},[location])

useEffect(() => {
  window.addEventListener("scroll", controlNavbar);
  return () => {
      window.removeEventListener("scroll", controlNavbar);
  };
}, [lastScrollY]);

  return (
    <nav className={`header ${mobileMenu ? 'mobileView' : ''} ${show}`}>
        <ContentWrapper>
              <div className="logo" onClick={() => navigate("/")}>
                  <img src={MovixLogo} alt='movix-logo'/>
              </div>
              <ul className='menuItems'>
                 <li className='menuItem' onClick={()=>handleExplore('movie')}>Movie</li>
                 <li className='menuItem' onClick={()=>handleExplore('tv')}>TV shows</li>
                 <li className='menuItem'>
                    <HiOutlineSearch onClick={()=> setShowSearchBar(true)}/>
                 </li>
              </ul>
              <div className="mobileMenuItems">
                  <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (
                       <VscChromeClose  onClick={()=>setMobileMenu(false)}/>
                    ) : (
                       <SlMenu onClick={openMobileMenu}/>
                    )}
              </div>
              {showSearchBar && (
                <div className='searchBar'>
                <div className='searchInput'>
                  <input
                    className='input'
                    placeholder='search movies,tv shows'
                    onChange={(e)=>setQuery(e.target.value)}
                    onKeyUp={handleChanges}
                  />
                  <VscChromeClose
                     onClick={() => setShowSearchBar(false)}
                  />
               </div>
             </div>
              )}
        </ContentWrapper>
    </nav>
  )
}

export default Header