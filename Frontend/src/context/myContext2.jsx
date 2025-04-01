import { create } from 'zustand';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import toast from 'react-hot-toast';

const useMyStore = create((set, get) => ({
    // Loading State
    loading: false,
    setLoading: (loading) => set({ loading }),

    // Products State
    getAllProduct: [],
    getAllProductFunction: async () => {
        console.log('getAllProductFunction called');
        set({ loading: true });
        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy('time')
            );
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                const productArray = [];
                console.log('QuerySnapshot: ', QuerySnapshot.size);
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                console.log('productArray: ', productArray);
                set({ 
                    getAllProduct: productArray,
                    loading: false 
                });
            });
            return unsubscribe;
        } catch (error) {
            console.log(error);
            set({ loading: false });
        }
    },

    // Orders State
    getAllOrder: [],
    getAllOrderFunction: async () => {
        set({ loading: true });
        try {
            console.log('getAllOrderFunction called');
            const q = query(
                collection(fireDB, "order"),
                orderBy('time')
            );
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                const orderArray = [];
                QuerySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });
                });
                console.log('query result: ', orderArray);
                set({ 
                    getAllOrder: orderArray,
                    loading: false 
                });
            });
            return unsubscribe;
        } catch (error) {
            console.log(error);
            set({ loading: false });
        }
    },

    // Delete Order Function
    deleteProduct: async (id) => {
        set({ loading: true });
        try {
            await deleteDoc(doc(fireDB, 'order', id));
            toast.success('Order Deleted successfully');
            await get().getAllOrderFunction();
            set({ loading: false });
        } catch (error) {
            console.log(error);
            set({ loading: false });
        }
    },

    // Users State
    getAllUser: [],
    getAllUserFunction: async () => {
        set({ loading: true });
        try {
            const q = query(
                collection(fireDB, "user"),
                orderBy('time')
            );
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                const userArray = [];
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                set({ 
                    getAllUser: userArray,
                    loading: false 
                });
            });
            return unsubscribe;
        } catch (error) {
            console.log(error);
            set({ loading: false });
        }
    },

    // Initial data fetching
    initializeStore: () => {
        get().getAllProductFunction();
        get().getAllOrderFunction();
        get().getAllUserFunction();
    }
}));

export default useMyStore;