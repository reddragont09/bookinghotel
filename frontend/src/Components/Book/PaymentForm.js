import React from "react";


function PaymentForm({ booking, setBooking, maxLengthCheck, onSubmitHandler }) {
    return (
        <>
            <h2 className="pl-5 text-2xl">Step 2: Payment Details</h2>
            <form className="p-5" onSubmit={onSubmitHandler}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <label htmlFor="first-name" className="mr-2">Card Holder*</label>

                    <input
                        id="first-name"
                        type="text"
                        className="p-2 border border-gray-600 mt-2 lg:w-3/4"
                        aria-required="true"
                        value={booking.full_name}
                        onChange={(e) =>
                            setBooking({
                                ...booking,
                                full_name: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pt-2 relative">
                    <label htmlFor="cardType" className="mr-2">
                        Card Type*
                    </label>

                    <select
                        id="cardType"
                        className="p-2 border border-gray-600 mt-2 lg:w-3/4"
                        value={booking.cardType}
                        onChange={(e) =>
                            setBooking({
                                ...booking,
                                cardType: e.target.value,
                            })
                        }
                    >
                        <option value="VISA">Visa</option>
                        <option value="Master">MasterCard</option>
                        <option value="JCB">JCB</option>
                    </select>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pt-2 relative">
                    <label htmlFor="card-number" className="mr-2">Card Number*</label>
                    <input
                        id="card-number"
                        type="text"
                        maxLength="16"
                        onInput={maxLengthCheck}
                        className="p-2 border border-gray-600 mt-2 lg:w-3/4"
                        placeholder="0000 0000 0000 0000"
                        aria-required="true"
                        value={booking.number}
                        onChange={(e) =>
                            setBooking({
                                ...booking,
                                number: e.target.value.replace(/\D/, "")
                            })
                        }
                    />
                    <i className="fas fa-credit-card text-gray-600 transform scale-150 absolute bottom-0 right-0 mr-5 mb-3"></i>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pt-2">
                    <label htmlFor="expiry-date" className="mr-2">Expiry Date*</label>
                    <div className="w-full lg:w-3/4">
                        <input
                            id="expiry-date"
                            type="number"
                            min="01"
                            max="12"
                            maxLength="2"
                            onInput={maxLengthCheck}
                            className="p-2 border border-gray-600 mt-2 md:w-2/12"
                            placeholder="MM"
                            aria-required="true"
                            value={booking.exp_month}
                            onChange={(e) =>
                                setBooking({
                                    ...booking,
                                    exp_month: e.target.value
                                })
                            }
                        />
                        /
                        <input
                            type="number"
                            min={new Date()
                                .getFullYear()
                                .toString()
                                .substr(2, 2)}
                            maxLength="4"
                            onInput={maxLengthCheck}
                            className="p-2 border border-gray-600 mt-2 md:w-2/12"
                            placeholder="YYYY"
                            value={booking.exp_year}
                            onChange={(e) =>
                                setBooking({
                                    ...booking,
                                    exp_year: e.target.value
                                })
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pt-2">
                    <label htmlFor="cvv" className="mr-2">CVV*</label>
                    <div className="w-full lg:w-3/4">
                        <input
                            id="cvv"
                            type="password"
                            maxLength="3"
                            onInput={maxLengthCheck}
                            className="p-2 border border-gray-600 mt-2 md:w-2/12"
                            placeholder="000"
                            aria-required="true"
                            value={booking.cvc}
                            onChange={(e) =>
                                setBooking({
                                    ...booking,
                                    cvc: e.target.value
                                })
                            }
                        />
                    </div>
                </div>

                <span aria-hidden="true" className="text-sm text-gray-500 mt-2 inline-block">
                    * required fields
                </span>

                <h2 className="pl-5 text-2xl">Step 3: Place Order</h2>

                <button
                    type="submit"
                    className="bg-orange-700 mt-5 py-2 px-6 text-3xl text-gray-200 block w-10/12 mx-auto hover:bg-orange-900"
                >
                    BOOK
                </button>
            </form>
        </>
    );
}

export default PaymentForm;
