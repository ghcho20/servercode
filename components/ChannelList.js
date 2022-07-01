import React from "react"

const ChannelList = ({channels}) => {
    const defimgsrc = "https://images-na.ssl-images-amazon.com/images/I/31VjU29FP+L.png"
    return (
      <>
      <div className="grid pt-5 justify-center">
        <div className="p-4 w-96 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-emerald-600 dark:border-emerald-200">
          <div className="flex justify-between items-center mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Total Channels
                </h5>
                <h5 className="text-xl font-font text-white">{channels.length}</h5>
            </div>
            <div className="flow-root">
                <ul role="list" class="divide-y divide-emerald-200 dark:divide-emerald-200">
                    {channels.map(channel => (
                        <li key={channel._id} className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full"
                                        src={channel.cover_url? channel.cover_url:defimgsrc} alt="Neil image" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {channel.name}
                                    </p>
                                    <p className="text-sm text-green-200 truncate dark:text-green-200">
                                        {channel.channel_url}
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base text-sm font-semibold text-gray-900 dark:text-white">
                                    {channel.is_super? 'super chat': 'group chat'}
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

export default ChannelList