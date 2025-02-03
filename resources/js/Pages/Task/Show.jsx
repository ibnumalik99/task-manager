import Main from "../../Layouts/Main";
import { Head, router, usePage } from "@inertiajs/react";
import Button from "../../Components/Button";
import { useState } from "react";

const Show = ({record}) => {
    const { application_name, auth } = usePage().props
    const [loading, setLoading] = useState(false)

    const handleUpdateStatus = () => {
        router.get(`/task/${record.id}/update-status`)
    }

    return (
        <div>
            <Head>
                <title>{`Show - ${application_name}`}</title>
            </Head>

            <div className="max-w-4xl mx-auto h-screen w-full grid content-center grid-cols-6 gap-x-6">
                <div className="col-span-4 flex gap-2">
                    <Button
                        btnType="submit"
                        type="warning"
                        text="Back"
                        onClick={() => router.get('/dashboard')}
                    >
                    </Button>
                </div>
                <div className="col-span-4 grid gap-4 content-start">
                    <div className="">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input
                            type="title"
                            id="title"
                            name="title"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                            value={record.title}
                            readOnly
                        />
                    </div>
                    <div className="">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea 
                            name="description"
                            id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-h-[150%]" 
                            value={record.description}
                            readOnly
                        ></textarea>
                    </div>
                </div>
                <div className="col-span-2 grid content-between border rounded-lg p-2 gap-4">
                    <div>
                        <div className="grid gap-2">
                            <label htmlFor="created_by" className="block text-sm font-medium text-gray-900 dark:text-white">Created By</label>
                            <input
                                type="text"
                                id="created_by"
                                name="created_by"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                                value={record.created_by && record.maker ? record.maker.name : '-'}
                                readOnly
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="assigned" className="block text-sm font-medium text-gray-900 dark:text-white">Assignedd</label>
                            <input
                                type="text"
                                id="assigned"
                                name="assigned"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                                value={record.assigned && record.recipient ? record.recipient.name : '-'}
                                readOnly
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="due_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
                            <input
                                type="text"
                                id="due_date"
                                name="due_date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                                placeholder="Your Name"
                                value={record.due_date || '-'}
                                readOnly
                            />
                        </div>
                    </div>
                    {record.assigned === auth.user.id && record.status != 'Completed' && (
                        <Button
                            btnType="submit"
                            type="warning"
                            text={record.status == 'Pending' ? 'On Progress' : 'Completed'}
                            optionalClass="w-full"
                            isLoading={loading}
                            onClick={handleUpdateStatus}
                        >
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

Show.layout = (page) => <Main children={page} title="Show" />;

export default Show;