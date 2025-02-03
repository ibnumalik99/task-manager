import { usePage, Link, router } from "@inertiajs/react";
import Main from "../Layouts/Main";
import { useEffect, useState } from 'react'
import Button from "../Components/Button";

const Dashboard = () => {
    const { tasks, auth } = usePage().props;
    const [groupedTasks, setGroupedTasks] = useState({ pending: [], inprogress: [], completed: [] });

    useEffect(() => {
        groupTasksByStatus(tasks);
    }, [tasks])

    const groupTasksByStatus = () => {
        const grouped = tasks.reduce((acc, task) => {
          const statusKey = task.status.toLowerCase().replace(/\s+/g, '');
          acc[statusKey] = acc[statusKey] || [];
          acc[statusKey].push(task);
          return acc;
        }, {});
    
        setGroupedTasks(grouped);
    };

    const create = () => {
        router.get("task")
    }

    const handleClickCard = (item) => {
        auth.user.id === item.created_by ? router.get(`/task/${item.id}/edit`) : router.get(`/task/${item.id}/show`) ;
    }

    return (
        <div className="px-12 py-10">
            <Button
                btnType="submit"
                type="warning"
                text="Create New"
                isLoading={false}
                onClick={create}
            >
            </Button>
            <div className="grid grid-cols-3 gap-6 border p-4">
                <div className="col-span-1">
                    <div className="grid text-center border-b p-4 mb-4">
                        Pending
                    </div>
                    <div className="grid gap-2">
                        {groupedTasks.pending && groupedTasks.pending.map((item) => {
                            return (
                                <div key={item.id} className="border rounded-lg p-4 flex justify-between hover:bg-gray-100 cursor-pointer" onClick={() => handleClickCard(item)}>
                                    <span>{item.title}</span>
                                    <i className="text-xs">{new Date(item.created_at).toLocaleDateString('en-CA')}</i>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="col-span-1">
                    <div className="grid text-center border-b p-4 mb-4">
                        In Progress
                    </div>
                    <div className="grid gap-2">
                        {groupedTasks.inprogress && groupedTasks.inprogress.map((item) => {
                            return (
                                <div key={item.id} className="border rounded-lg p-4 flex justify-between hover:bg-gray-100 cursor-pointer" onClick={() => handleClickCard(item)}>
                                    <span>{item.title}</span>
                                    <i className="text-xs">{new Date(item.created_at).toLocaleDateString('en-CA')}</i>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="col-span-1">
                    <div className="grid text-center border-b p-4 mb-4">
                        Completed
                    </div>
                    <div className="grid gap-2">
                        {groupedTasks.completed && groupedTasks.completed.map((item) => {
                            return (
                                <div key={item.id} className="border rounded-lg p-4 flex justify-between hover:bg-gray-100 cursor-pointer" onClick={() => handleClickCard(item)}>
                                    <span>{item.title}</span>
                                    <i className="text-xs">{new Date(item.created_at).toLocaleDateString('en-CA')}</i>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

Dashboard.layout = (page) => <Main children={page} title="Welcome" />;

export default Dashboard;