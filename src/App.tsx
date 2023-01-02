import { useState } from "react";
import Logo from "./assets/logo.svg";
import { ReactComponent as Cart } from "./assets/icon-cart.svg";
import { ReactComponent as Close } from "./assets/icon-close.svg";
class CartItem {
  quantity: number = 0;
  price: number = 0;
  discount: number = 0;
  name: string = "";
  imageUrl: string = "";
  description: string = "";

  constructor(props: {
    description: string;
    quantity?: any;
    price?: any;
    name?: any;
    imageUrl?: any;
    discount?: any;
  }) {
    this.quantity = props.quantity;
    this.price = props.price;
    this.name = props.name;
    this.imageUrl = props.imageUrl;
    this.description = props.description;
    this.discount = props.discount;
  }
}
const images = [
  "/images/image-product-1.jpg",
  "/images/image-product-2.jpg",
  "/images/image-product-3.jpg",
  "/images/image-product-4.jpg",
];
const currentProduct = new CartItem({
  quantity: 3,
  imageUrl: images[0],
  description: `These low-profile sneakers are your perfect casual wear companion. Featuring a 
  durable rubber outer sole, they’ll withstand everything the weather can offer.`,
  name: "Fall Limited Edition Sneakers",
  price: 125,
  discount: 50,
});
let selectedIndex = 0;

function App() {
  const [cartItems, SetCartItems] = useState<CartItem[]>([currentProduct]);
  const [selectedImageUrl, SetSelectedImageUrl] = useState(images[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);

  function canGoPrevious() {
    return selectedIndex > 0;
  }
  function canGoNext() {
    return selectedIndex < images.length - 1;
  }
  function nextImage() {
    if (!canGoNext()) {
      return;
    }
    selectedIndex++;
    SetSelectedImageUrl(images[selectedIndex]);
  }
  function previousImage() {
    if (!canGoPrevious()) {
      return;
    }
    selectedIndex--;
    SetSelectedImageUrl(images[selectedIndex]);
  }
  return (
    <div className="md:px-[5%] lg:px-[10%] flex flex-col">
      <header
        className="  bg-white items-start  
      px-5 flex justify-between  pb-5 md:pb-0"
      >
        <div className="flex  items-start gap-3 pt-5 ">
          <button
            className="md:hidden"
            onClick={() => {
              setIsDrawerOpen(!isDrawerOpen);
            }}
          >
            <img alt="menu" src="/images/icon-menu.svg" />
          </button>
          <img alt="logo" className="fill-gray-500" src={Logo} />
          <div className="md:flex mx-3 hidden gap-8">
            <p className="nav-button">Collections</p>
            <p className="nav-button">Men</p>
            <p className="nav-button">Women</p>
            <p className="nav-button">About</p>
            <p className="nav-button">Contact</p>
          </div>
        </div>

        <div className="flex gap-5 pt-5 relative  items-center">
          <button className=" relative">
            <div
              onClick={() => {
                setIsCartOpen(!isCartOpen);
              }}
            >
              <p className="-mb-4  text-[0.6rem] mx-[0.1rem] relative -top-2 -right-2  rounded-full bg-orange-500 text-white">
                {cartItems.length}
              </p>
              <Cart className="fill-black" />
            </div>
          </button>
          <div
            className={`${
              isCartOpen
                ? " first-letter: duration-500 mt-16 translate-x-0 scale-100  translate-y-0"
                : " duration-500 translate-x-28 scale-0 -translate-y-full"
            }  absolute -right-5 shadow-lg drop-shadow-2xl  top-0 w-[19.5rem] flex  flex-col p-5  z-30 bg-white rounded-xl my-1 mx-1`}
          >
            <p className="font-bold ">Cart</p>
            <div className="bg-gray-200 h-[1px] my-5 -mx-5" />
            {cartItems.length == 0 ? (
              <p className="p-10 self-center  text-gray-600">
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="flex text-gray-600 gap-2 justify-between items-center p-1"
                  >
                    <img
                      className="h-10 rounded overflow-clip"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    <div className="flex text-sm flex-col">
                      <p>{product.name}</p>
                      <div className=" inline-flex gap-2">
                        <p>
                          ${product.price} x {product.quantity}
                        </p>
                        <p className="font-bold text-gray-800">
                          ${product.price * product.quantity}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        cartItems.splice(index, 1);
                        SetCartItems([...cartItems]);
                      }}
                    >
                      <img
                        className="h-3 cursor-pointer"
                        alt="del"
                        src="/images/icon-delete.svg"
                      />
                    </button>
                  </div>
                );
              })
            )}
            {cartItems.length > 0 && (
              <button className="text-center rounded-md mt-4 text-white bg-orange-600 p-3">
                Checkout
              </button>
            )}
          </div>
          <button>
            <img alt="avatar"
              className="fill-black h-5 w-5"
              src="/images/image-avatar.png"
            />
          </button>
        </div>
        <div
          onClick={(e) => {
            if (e.currentTarget === e.target) setIsDrawerOpen(!isDrawerOpen);
          }}
          className={`absolute ${
            isDrawerOpen
              ? "ease-linear duration-500 translate-x-0"
              : "ease-linear  duration-500 -translate-x-full"
          } top-50 md:hidden  right-0 z-50 w-full h-full bg-[#10000098]`}
        >
          <div
            className={`flex  ${
              isDrawerOpen
                ? " duration-500 translate-x-0"
                : " duration-500 -translate-x-full"
            } text-start gap-3 font-bold text-gray-800 p-5 bg-white h-full w-[60%] flex-col`}
          >
            <button
              onClick={() => {
                setIsDrawerOpen(!isDrawerOpen);
              }}
              className="mb-7"
            >
              <img alt="close" src="/images/icon-close.svg" />
            </button>
            <p>Collections</p>
            <p>Men</p>
            <p>Women</p>
            <p>About</p>
            <p>Contact</p>
          </div>
        </div>
      </header>
      <div
        className="bg-gray-200 hidden 
      md:block h-[1px] "
      />

      <div
        className="grid md:px-[5%]
       lg:px-[10%] md:mt-10 md:gap-5 items-center grid-cols-1 md:grid-cols-2"
      >
        <section
          className="hidden items-center
 md:flex flex-col"
        >
          <img
            onClick={() => {
              setIsFullViewOpen(true);
            }}
            className="rounded-2xl w-[18rem] h-[18rem]"
            alt="sel"
            src={selectedImageUrl}
          />
          <div className="flex gap-3 my-10">
            {images.map((img, i) => {
              return (
                <div
                  onClick={() => {
                    selectedIndex = i;
                    SetSelectedImageUrl(img);
                  }}
                  className="rounded-lg relative overflow-clip h-16 w-16"
                >
                  <img alt={i.toString()} key={i + "img"} src={img} />
                  <div
                    className={`absolute top-0 right-0
${
  img === selectedImageUrl
    ? "border-[1px] rounded-lg bg-[#ffffffaf] border-orange-600"
    : ""
}
 z-0 h-full w-full hover:bg-[#ffffff7a]  `}
                  ></div>
                </div>
              );
            })}
          </div>
          <div
            className={`${
              isFullViewOpen ? "block" : "hidden"
            } absolute z-40 flex flex-col items-center justify-center top-0 right-0 h-full w-full bg-[#000000d2]`}
          >
            <div className={`flex flex-col relative z-10  `}>
              {canGoPrevious() && (
                <button
                  onClick={previousImage}
                  className="absolute  flex
      items-center justify-center
      rounded-full
       h-10 w-10 -mx-5 z-50
       bg-white  top-[50%]"
                >
                  <img alt="prev" src="/images/icon-previous.svg" />
                </button>
              )}
              {canGoNext() && (
                <button
                  onClick={nextImage}
                  className="absolute right-0 flex
      items-center justify-center
      rounded-full
       h-10 w-10 -mx-5 z-10
       bg-white  top-[50%]"
                >
                  <img alt="nex" src="/images/icon-next.svg" />
                </button>
              )}
              <button
                onClick={() => {
                  setIsFullViewOpen(false);
                }}
                className="self-end my-5"
              >
                <Close className="fill-white hover:fill-orange-500" />
              </button>
              <img alt="selected"
                className="rounded-2xl w-[22rem] h-[22rem]"
                src={selectedImageUrl}
              />
            </div>

            <div className="flex gap-3 my-10">
              {images.map((img, i) => {
                return (
                  <div
                    onClick={() => {
                      selectedIndex = i;
                      SetSelectedImageUrl(img);
                    }}
                    className="rounded-lg relative overflow-clip h-16 w-16"
                  >
                    <img
                      className="z-10"
                      alt={i.toString()}
                      key={i + "img"}
                      src={img}
                    />
                    <div
                      className={`absolute top-0 right-0
${
  img === selectedImageUrl
    ? "border-[1px] rounded-lg bg-[#ffffffaf] border-orange-600"
    : ""
}
 z-20 h-full w-full hover:bg-[#ffffff7a]  `}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="md:hidden">
          <div className="bg-black relative z-10  w-full">
            {canGoPrevious() && (
              <button
                onClick={previousImage}
                className="absolute  flex
      items-center justify-center
      rounded-full
       h-10 w-10 mx-5 z-50
       bg-white  top-[45%]"
              >
                <img  alt="p" src="/images/icon-previous.svg" />
              </button>
            )}
            {canGoNext() && (
              <button
                onClick={nextImage}
                className="absolute right-0 flex
      items-center justify-center
      rounded-full
       h-10 w-10 mx-5 z-10
       bg-white  top-[45%]"
              >
                <img alt="n" src="/images/icon-next.svg" />
              </button>
            )}
            <img
              alt="Image"
              className=" w-full h-[20rem] object-cover  object-top"
              src={selectedImageUrl}
            />
          </div>
        </section>
        <section className="p-5  flex flex-col ">
          <p className="uppercase  text-xs  text-orange-600 tracking-widest">
            Sneaker company
          </p>
          <p className="font-bold my-3 text-2xl break-words">
            {currentProduct.name}
          </p>
          <p className="text-gray-500  text-sm">{currentProduct.description}</p>
          <div className=" mt-5 flex   items-baseline justify-between">
            <div className="flex gap-3   items-baseline">
              <p className="font-bold  text-2xl">${currentProduct.price}</p>
              <p
                className="bg-orange-200 px-2
             rounded-md text-sm text-orange-600 font-bold"
              >
                {currentProduct.discount}%
              </p>
            </div>
            <p className="text-gray-500    underline lower-underline">
              ${(currentProduct.price / currentProduct.discount) * 100}
            </p>
          </div>
          <div className="grid md:gap-4 items-center grid-cols-1 md:grid-cols-2">
            <div className="flex  py-3 px-5 items-center  my-5 rounded-md bg-gray-100 flex-row justify-between">
              <img alt="min" className="h-1 w-3 " src="/images/icon-minus.svg" />
              <p className="font-bold text-xs">
                {cartItems.length > 0
                  ? cartItems.map((a) => a.quantity).reduce((s, a) => a + s)
                  : 0}
              </p>
              <img alt="pl"
                className="h-[10px] w-[10px]"
                src="/images/icon-plus.svg"
              />
            </div>
            <button
              onClick={() => {
                SetCartItems([...cartItems, currentProduct]);
                setIsCartOpen(true);
              }}
              className="text-center transition-all hover:scale-110 animate-moving-line shadow-orange-200  shadow-xl 
          rounded-md mt-4 md:mt-0 text-white bg-orange-600 p-3"
            >
              <div className="flex justify-center gap-3 items-center">
                <Cart className="fill-white  scale-75" />

                <p className="text-xs">Add to cart</p>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
