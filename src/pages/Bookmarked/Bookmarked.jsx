import { useState, useEffect } from 'react';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import SingleProp from '../../component/SingleProp/SingleProp'; // Import SingleProp component for displaying items
import './Bookmarked.css'; // Create this CSS file for styling

const BookmarkedItemsList = () => {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarkedItems = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          // Fetch the user's bookmarks
          const userDoc = await getDoc(doc(db, 'UserBookmarks', user.uid));
          if (userDoc.exists()) {
            const bookmarkedIds = userDoc.data().bookmarks || [];

            // Fetch the details of bookmarked items
            const propertiesCollection = collection(db, 'Properties');
            const propertiesSnapshot = await getDocs(propertiesCollection);
            const properties = propertiesSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            // Filter the properties to get only bookmarked ones
            const bookmarkedItems = properties.filter((property) =>
              bookmarkedIds.includes(property.id)
            );
            setBookmarkedItems(bookmarkedItems);
          }
        } catch (error) {
          setError('Error fetching bookmarks');
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setError('User not logged in');
        setLoading(false);
      }
    };

    fetchBookmarkedItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='bookmarked-items-list'>
      <h2>Your Bookmarked Items</h2>
      {bookmarkedItems.length === 0 ? (
        <p>No bookmarked items found.</p>
      ) : (
        <div className='property-list'>
          {bookmarkedItems.map((item) => (
            <SingleProp key={item.id} property={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkedItemsList;
