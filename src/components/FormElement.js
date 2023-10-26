//className 的部分要考慮
export default function Input({ register, errors, id, labelText, type, rules, placeholder, labelClass, inputClass }) {
    if (inputClass === '') {
        inputClass = 'text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none p-2'
    }
    if (labelClass === '') {
        labelClass = 'mb-1 text-xs sm:text-sm tracking-wide text-gray-600'
    }
    return (
        <div className="w-full">
            {labelText !== '' && <label htmlFor="name" className={labelClass}>
                {labelText}
            </label>}

            <input
                {...register(id, rules)}
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                className={`${errors[id] && 'border-red-500'} ${inputClass}`}
            />

            {errors[id] &&
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {errors[id]?.message}
                </span>}
        </div>
    )
}

