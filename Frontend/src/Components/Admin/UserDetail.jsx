import { useContext } from "react";
import myContext from "../../context/myContext";

const UserDetail = () => {
    // const context = useContext(myContext);
    const context = useMyStore();

    const { getAllUser } = context;

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="py-5 flex justify-between items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                    All Users
                </h1>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-collapse sm:border-separate border-gray-700 text-gray-300 shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                            <th className="h-12 px-6 border-l border-gray-700 first:border-l-0 font-bold">S.No.</th>
                            <th className="h-12 px-6 border-l border-gray-700 first:border-l-0 font-bold">Name</th>
                            <th className="h-12 px-6 border-l border-gray-700 first:border-l-0 font-bold">Email</th>
                            <th className="h-12 px-6 border-l border-gray-700 first:border-l-0 font-bold">Uid</th>
                            <th className="h-12 px-6 border-l border-gray-700 first:border-l-0 font-bold">Role</th>
                            <th className="h-12 px-6 border-l border-gray-700 first:border-l-0 font-bold">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {getAllUser.map((value, index) => (
                            <tr
                                key={index}
                                className="transition-all duration-300 bg-gray-800 hover:bg-gray-700 hover:shadow-lg hover:shadow-pink-500/50"
                            >
                                <td className="h-12 px-6 border-t border-gray-700">{index + 1}</td>
                                <td className="h-12 px-6 border-t border-gray-700 first-letter:uppercase">{value.name}</td>
                                <td className="h-12 px-6 border-t border-gray-700 cursor-pointer">{value.email}</td>
                                <td className="h-12 px-6 border-t border-gray-700 cursor-pointer">{value.uid}</td>
                                <td className="h-12 px-6 border-t border-gray-700 cursor-pointer">{value.role}</td>
                                <td className="h-12 px-6 border-t border-gray-700 cursor-pointer">{value.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDetail;
