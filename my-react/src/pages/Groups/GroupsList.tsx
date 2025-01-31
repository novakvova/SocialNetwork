import { Link } from "react-router-dom";
import {  Card, Dropdown, MenuProps, notification } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useDeleteGroupMutation, useGetGroupsQuery} from "../../services/apiGroup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IGroupItem } from "../../models/types";


const GroupsListPage: React.FC = () => {
    const { data: list, isLoading, error, refetch: refetchGroup } = useGetGroupsQuery();
    const [deleteGroup] = useDeleteGroupMutation();
    const userId = useSelector((state: RootState) => state.account.account?.id);

    // Видалення групи
    const handleDelete = async (groupId: number) => {
        try {
            await deleteGroup(groupId);
            notification.success({ message: "Групу видалено" });
            refetchGroup();
        } catch {
            notification.error({ message: "Помилка видалення групи" });
        }
    };

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка завантаження даних</p>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-center text-4xl font-extrabold bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 my-6">
                Список груп
            </h1>

            <div className="mb-4 flex justify-end">
                <Link to="create" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Додати групу
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {list?.map((group: IGroupItem) => {
                    const isOwner = userId;

                    // Меню для власника групи
                    const menuItems: MenuProps["items"] = [
                        {
                            key: "edit",
                            label: <Link to={`edit/${group.id}`}>Редагувати</Link>,
                        },
                        {
                            key: "delete",
                            label: (
                                <span
                                    className="text-red-500"
                                    onClick={() => handleDelete(group.id) }
                                >
                                    Видалити
                                </span>
                            ),
                        },
                    ];

                    return (
                        // Assign key to Link here instead of Card
                        <Link to={`details/${group.id}`} key={group.id} className="text-blue-500 hover:underline">
                            <Card
                                title={group.name}
                                className="shadow-lg rounded-lg border"
                                extra={
                                    <div className="flex items-center gap-2">
                                        {isOwner && (
                                            <Dropdown menu={{ items: menuItems }} placement="bottomRight">
                                                <MoreOutlined className="cursor-pointer text-lg" />
                                            </Dropdown>
                                        )}
                                    </div>
                                }
                            >
                                <div className="mt-4 flex justify-between">
                                    <p className="text-gray-600">{group.description}</p>
                                </div>
                            </Card>
                        </Link>
                    );
                })}

            </div>
        </div>
    );
};

export default GroupsListPage;
