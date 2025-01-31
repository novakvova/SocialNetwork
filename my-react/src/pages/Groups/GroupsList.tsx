import { Link } from "react-router-dom";
import { Card, Dropdown, Pagination, notification, Button, MenuProps } from "antd";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { useDeleteGroupMutation, useGetGroupsQuery } from "../../services/apiGroup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IGroupItem } from "../../models/types";
import { useState } from "react";
import defaultProfile from "../../assets/images/ItGram.webp";
import { Col, Row } from "antd"
import SideIntro from "../../components/SideIntro";

const GroupsListPage: React.FC = () => {
    const { data: list, isLoading, error, refetch: refetchGroup } = useGetGroupsQuery();
    const [deleteGroup] = useDeleteGroupMutation();
    const userId = useSelector((state: RootState) => state.account.account?.id);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;

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

    const paginatedList = list?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <Row>
                  <Col span={8}>
                    <SideIntro/>
                  </Col>
                  <Col span={8}>
                  <div className="max-w-4xl mx-auto">
            {/* Заголовок з кнопкою "+" */}
            <div className="flex items-center justify-between my-4 mt-0">
                <h1 className="text-4xl  font-extrabold bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                    Групи
                </h1>
                <Link to="create">
                    <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
                </Link>
            </div>

            <div className="space-y-4">
                {paginatedList?.map((group: IGroupItem) => {
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
                        <Card key={group.id} className="shadow-lg rounded-lg border p-1">
                            <div className="flex items-center space-x-3">
                                <Link to={`details/${group.id}`} className="text-xl font-semibold text-blue-500 hover:underline">
                                    <img src={group.image || defaultProfile} alt="Фото групи" className="w-16 h-16 object-cover rounded-xl" />
                                </Link>
                                <div className="flex-1">
                                    <Link to={`details/${group.id}`} className="text-xl font-semibold text-blue-500 hover:underline">
                                        {group.name}
                                    </Link>
                                    <p className="text-gray-600">{group.description}</p>
                                </div>
                                {userId && (
                                    <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
                                        <MoreOutlined className="cursor-pointer text-lg" />
                                    </Dropdown>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>

            <div className="flex justify-center mt-6">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={list?.length || 0}
                    onChange={setCurrentPage}
                />
            </div>
        </div>
            </Col>
                  <Col span={8}>
                  </Col>
                </Row>
        
    );
};

export default GroupsListPage;
