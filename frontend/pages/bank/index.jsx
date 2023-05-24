import React from 'react'
import BankTransfer from '../../components/BankTransfer'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { BigNumber, ethers } from "ethers";
import { EURE_TOKEN_ADDRESS } from "../../constants";
import { useForm } from "react-hook-form";
import { CopyButton } from '../../components/CopyButton';


const BalanceBanner = ({ daiBalance, eureBalance }) => {
    return (
        <div className="bg-accent/20 px-4 py-4 flex justify-center gap-4 items-center mb-4">
            <p>
                xDAI Balance:{" "}
                <span className="font-bold">
                    {/* {(ethers.utils.formatEther(daiBalance)).toPrecision(4)} */}
                    {daiBalance}
                </span>
            </p>
            <p>
                EURe Balance:{" "}
                <span className="font-bold">
                    {/* {ethers.utils.formatEther(eureBalance)} */}
                    {eureBalance}
                </span>
            </p>
        </div>
    );
};

const BankPage = () => {
    // const { offRamp } = useOnRamp();

    const { address } = useAccount();
    const { chain } = useNetwork();

    const { data: eureBalance } = useBalance({ token: EURE_TOKEN_ADDRESS[chain?.id ?? 31337], address });

    const { data: daiBalance } = useBalance({
        address,
    });

    console.log("daiBalance", daiBalance)
    console.log("eureBalance", eureBalance)

    const onSubmit = handleSubmit(async (data) => {
        await offRamp(data.iban, Number(data.amount));
        await refetch();
        reset();
    });

    return (
        <div>
            <h1>Bank Transfer</h1>
            <h3>Swap Section</h3>

            {/* <BalanceBanner daiBalance={daiBalance?.value} eureBalance={eureBalance?.value} /> */}

            {/* <BalanceBanner
          daiBalance={daiBalance?.value || BigNumber.from(0)}
          eureBalance={eureBalance?.value || BigNumber.from(0)}
        /> */}


            {/* giving option for token of choice */}
            {/* <BankTransfer /> */}
            <div className='flex align-middle justify-center'>
                <div className='bg-green'>
                    <div className='pt-4 px-4'>
                        <h1 className="text-4xl text-white py-4  font-sans">
                            Hey ! 👋
                        </h1>
                        <h2 className="text-base text-white py-2 pb-10 font-sans "> Its time to secure you !</h2>
                    </div>

                    <div className='bg-white rounded-[16px] object-contain w-[500px] h-[400px] relative'>
                        <div className="flex h-full items-center justify-center px-4 inset-x-0 bottom-0">
                            <div className="w-full">
                                <h2 className="text-2xl font-bold mt-8 mb-4">Buy crypto</h2>
                                {/* <IbanBanner /> */}

                                <h2 className="text-2xl font-bold mb-4 mt-8">Sell crypto</h2>
                                <p>Convert your EURe to euros in your bank account</p>
                                <form className="flex flex-col gap-2 mt-4 w-full" onSubmit={onSubmit}>
                                    <Input
                                        className="flex-1"
                                        label="Enter your IBAN"
                                        {...register("iban", { required: "IBAN is required" })}
                                        error={errors.iban?.message}
                                    />
                                    <Input
                                        type="number"
                                        className="flex-1"
                                        label="Amount"
                                        error={
                                            errors.amount?.type === "max"
                                                ? "Amount exceeds balance"
                                                : errors.amount?.message
                                        }
                                        {...register("amount", {
                                            required: "Amount is required",
                                            max: ethers.utils.formatEther(eureBalance?.value || 0),
                                        })}
                                    />
                                    <Button
                                        type="submit"
                                        className="mt-2"
                                        disabled={isSubmitting}
                                        loading={isSubmitting}
                                    >
                                        Send
                                    </Button>
                                </form>

                                <div>
                                    {/* <img src={uri} width="100%" alt="flux wallet qr code" /> */}
                                    <div className='px-6 text-center'>
                                        <input type="String" placeholder="Enter Verification Code" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className='py-2 items-center justify-center text-center'>
                                        <label htmlFor="my-modal-6" className="btn" >Verify</label>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>



        </div>
    )
}

export default BankPage