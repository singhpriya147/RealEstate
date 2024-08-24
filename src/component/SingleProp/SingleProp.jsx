
import { useState ,useEffect} from 'react';
import './SingleProp.css'
import { AppContext } from '../../context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CiBookmark } from 'react-icons/ci';
import { doc,setDoc,getDoc,arrayUnion,arrayRemove } from 'firebase/firestore';
import {auth,db} from '../../firebase/firebase'





const SingleProp = ({property}) => {

  // console.log(property.images,"line17");

  // const removeHtmlTags = (str) => {
  //   return str.replace(/<[^>]*>/g, '');
  // };
  // const fullShortDescription = removeHtmlTags(property.short_description)
 



// const getShorterDescription = (description, wordLimit) => {
//   const words = description.split(' ');
//   if (words.length <= wordLimit) {
//     return description;
//   }
//   return words.slice(0, wordLimit).join(' ') + '...';
// };


// const halfShortDescription = getShorterDescription(fullShortDescription,15);

//   const[isExpanded,setIsExpanded]=useState(false);
//   const toggleDescription=()=>{
//     setIsExpanded(!isExpanded);
//   }


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




const AddToCart=async()=>{
  dispatch({type:'ADD_TO_CART', payload:property})


  // const user = auth.currentUser;
  // if (user) {
  //   try {
  //     await setDoc(doc(db, 'UserBookmarks', user.uid), {
  //       bookmarks: arrayUnion(property.listing_id)
  //     }, { merge: true });
  //     console.log('Bookmark added');
  //   } catch (error) {
  //     console.error('Error adding bookmark: ', error);
  //   }
  // }


}

const RemoveFromCart = async () => {
  dispatch({ type: 'REMOVE_FROM_CART', payload: property });

// const user = auth.currentUser;
//   if (user) {
//     try {
//       await setDoc(doc(db, 'UserBookmarks', user.uid), {
//         bookmarks: arrayRemove(property.listing_id)
//       }, { merge: true });
//       console.log('Bookmark removed');
//     } catch (error) {
//       console.error('Error removing bookmark: ', error);
//     }
//   }



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
          {cart.some((item) => item.id === property.id) ? (
            <button onClick={RemoveFromCart}>Remove Now</button>
          ) : (
            <button onClick={AddToCart}>Book Now</button>
          )}
        </div>
      </div>
    </Link>
  );
}

export default SingleProp