import React from "react"

const Users = ({users}) => {
    const defimgsrc = "data:image/jpeg;base64,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"
    return (
      <>
      <div className="grid pt-5 justify-center">
        <div className="p-4 w-96 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-emerald-600 dark:border-emerald-200">
          <div className="flex justify-between items-center mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Total Users
                </h5>
                <h5 className="text-xl font-font text-white">{users.length}</h5>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-emerald-200 dark:divide-emerald-200">
                    {users.map(user => (
                        <li key={user.user_id} className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full"
                                        src={user.profile_url? user.profile_url:defimgsrc} alt="Neil image" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {user.nickname}
                                    </p>
                                    <p className="text-sm text-green-200 truncate dark:text-green-200">
                                        id&gt; {user.user_id}
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base text-sm font-semibold text-gray-900 dark:text-white">
                                    {user.is_active? 'active': 'deactive'}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
      </>
    );
}

export default Users