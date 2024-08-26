
import { useState ,useEffect} from 'react';
import './SingleProp.css'
import { AppContext } from '../../Context.jsx';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CiBookmark } from 'react-icons/ci';
import { doc,setDoc,getDoc,arrayUnion,arrayRemove } from 'firebase/firestore';
import {auth,db} from '../../firebase/firebase'
import CartButton from '../CartButton/CartButton.jsx';




const SingleProp = ({property}) => {


const { state ,dispatch } = useContext(AppContext);
const {cart } = state;

// const isBookmarked = userBookmarks.includes(property.listing_id);
 const [isBookmarked, setIsBookmarked] = useState(false);



 useEffect(() => {
   const checkIfBookmarked = async () => {
     const user = auth.currentUser;
     if (user) {
       const userDoc = await getDoc(doc(db, 'UserBookmarks', user.uid));
       if (userDoc.exists()) {
         const bookmarks = userDoc.data().bookmarks || [];
         setIsBookmarked(bookmarks.includes(property.id));
       }
     }
   };
   checkIfBookmarked();
 }, [property.id]);



  const toggleBookmark = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        if (isBookmarked) {
          // Remove from bookmarks
          await setDoc(
            doc(db, 'UserBookmarks', user.uid),
            {
              bookmarks: arrayRemove(property.id),
            },
            { merge: true }
          );
          setIsBookmarked(false);
        } else {
          // Add to bookmarks
          await setDoc(
            doc(db, 'UserBookmarks', user.uid),
            {
              bookmarks: arrayUnion(property.id),
            },
            { merge: true }
          );
          setIsBookmarked(true);
        }
        console.log(isBookmarked ? 'Bookmark removed' : 'Bookmark added');
      } catch (error) {
        console.error('Error toggling bookmark: ', error);
      }
    }
  };










const id = property.id;
  return (
    <Link to={`/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className='single-property'>
        <div>
          <img
            src={property?.images[0]?.original || property.images[0]}
            height={250}
            width={250}
            className='image-div'
            alt=''
          />

          <h2>{property.title}</h2>
          <div className='bookmark'>
            <b>{property.price}</b>
            <CiBookmark
              onClick={toggleBookmark}
              style={{
                cursor: 'pointer',
                color: isBookmarked ? 'red' : 'gray',
              }}
            />
          </div>

          <p>{property.description}</p>
          {/* {cart.some((item) => item.id === property.id) ? (
            <button onClick={RemoveFromCart}>Remove Now</button>
          ) : (
            <button onClick={AddToCart}>Book Now</button>
          )} */}
          <CartButton property={property}/>
        </div>
      </div>
    </Link>
  );
}

export default SingleProp