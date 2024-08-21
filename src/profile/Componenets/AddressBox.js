import PropTypes from "prop-types";

const Content = ({ className = "", address }) => {
  console.log(address);
  return (
    <div
      className={`flex-1 rounded-lg box-border flex flex-col items-center justify-start py-3.5 px-[23px] gap-[8px] min-w-[222px] max-w-full text-left text-base text-black font-caption-1 border-[1px] border-solid border-neutral-04-100 ${className}`}
    >
      <div className="self-stretch flex flex-row items-start justify-between gap-[20px] mq450:flex-wrap">
        <a className="[text-decoration:none] relative leading-[26px] font-semibold text-[inherit] inline-block min-w-[116px]">
          {address?.address}
        </a>
        {/* <div className="flex flex-row items-center justify-start gap-[4px] text-neutral-04-100">
          <Image
            width={100}
            height={100}
            className="h-4 w-4 relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/outlineedit.svg"
          />
          <a className="[text-decoration:none] relative leading-[26px] font-semibold text-[inherit] inline-block min-w-[31px]">
            Edit
          </a>
        </div> */}
      </div>
      <div className="self-stretch flex flex-col items-start justify-start py-0 pr-5 pl-0 gap-[4px] text-sm">
        {/* <div className="relative leading-[22px] inline-block min-w-[67px]">
          Jeet Patel
        </div> */}
        <div className="relative leading-[22px] inline-block min-w-[126px]">
          PinCode:{address?.pincode}{" "}
        </div>
        <div className="relative leading-[22px]">{address.addressType} </div>
      </div>
    </div>
  );
};

Content.propTypes = {
  className: PropTypes.string,
  billingAddress: PropTypes.string,
};

export default Content;
