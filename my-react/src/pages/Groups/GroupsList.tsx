import { Link } from "react-router-dom";
import { Button, notification } from "antd";
import { useDeleteGroupMutation, useGetGroupsQuery, useJoinGroupMutation, useLeaveGroupMutation } from "../../services/apiGroup";
import { useAppDispatch } from "../../redux/hooks";
import { clear } from "../../redux/account/accountSlice";

const GroupsListPage = () => {
    const { data: list, isLoading, error } = useGetGroupsQuery();  
    console.log("isLoading REDUX", isLoading);
    console.log("error REDUX", error);
    const [deleteGroup] = useDeleteGroupMutation(); 
    const dispatch = useAppDispatch();
    const [joinGroup] = useJoinGroupMutation();
    const [leaveGroup] = useLeaveGroupMutation();

    const handleJoinGroup = async (id: number) => {
        try {
            await joinGroup(id).unwrap(); 
            notification.success({
                message: 'Ви приєдналися до групи',
                description: 'Ви успішно приєдналися до групи!',
            });
            dispatch(clear());
        } catch {
            notification.error({
                message: 'Помилка приєднання до групи',
                description: 'Щось пішло не так, спробуйте ще раз.',
            });
        }
    };
      const handleLeaveGroup = async (id: number) => {
        try {
            await leaveGroup(id).unwrap(); 
            notification.success({
                message: 'Ви вийшли з групи',
                description: 'Ви успішно вийшли з групи!',
            });
            dispatch(clear());
        } catch {
            notification.error({
                message: 'Помилка виходу з групи',
                description: 'Щось пішло не так, спробуйте ще раз.',
            });
        }
      };
    

    const handleDelete = async (id: number) => {
        try {
            await deleteGroup(id).unwrap();
            notification.success({
                message: 'Категорія видалена',
                description: 'Категорія успішно видалена!',
            });
            dispatch(clear());
        } catch {
            notification.error({
                message: 'Помилка видалення категорії',
                description: 'Щось пішло не так, спробуйте ще раз.',
            });
        }
    };
    const mapData = list?.map((group) => (
        <tr key={group.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {group.name}
            </th>
            <td className="px-6 py-4">
                {group.description}
            </td>
            <td className=" px-6 py-4">
                <Link to={`edit/${group.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                <Button
                    className="ml-3"
                    type="primary"
                    danger
                    onClick={() => handleDelete(group.id)}
                >
                    Delete
                </Button>
                <Link to={`details/${group.id}`} className="ml-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">View Details</Link> 
                <Button
                    className="ml-3"
                    type="primary"
                    danger
                    onClick={() => handleJoinGroup(group.id)}
                >
                    Приєднатись
                </Button>
                <Button
                    className="ml-3"
                    type="primary"
                    danger
                    onClick={() => handleLeaveGroup(group.id)}
                >
                    Покинути
                </Button>

            </td>
        </tr>
    ));

    return (
        <>
            <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 my-6">
                Список груп
            </h1>

            <div className={"mb-4"}>
                <Link to={"create"} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Додати групу
                </Link>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Назва
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Опис
                            </th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mapData}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GroupsListPage;
