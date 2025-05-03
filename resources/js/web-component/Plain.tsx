

  
  
export default function Plain({plans}) {
  return (
    <div className="container mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan, index) => (
        <div
          key={index}
          className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-8 dark:border-gray-700 dark:bg-gray-800"
        >
          <h5 className="mb-4 text-xl font-medium text-black-500 dark:text-gray-400">{plan.title}</h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
            <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/{plan.frequency}</span>
          </div>
          <ul role="list" className="my-7 space-y-5">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-center">
                <svg
                  className="h-4 w-4 shrink-0 c_text-blue-700 dark:text-blue-500c_text-blue-700"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="ms-3 text-base leading-tight font-normal text-gray-500 dark:text-gray-400">
                  {feature}
                </span>
              </li>
            ))}
            {plan.disabledFeatures.map((feature, idx) => (
              <li key={idx} className="flex line-through decoration-gray-500">
                <svg
                  className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="ms-3 text-base leading-tight font-normal text-gray-500">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 focus:outline-none dark:bg-customgreen-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
          >
            Choose plan
          </button>
        </div>
      ))}
    </div>
  );
}
