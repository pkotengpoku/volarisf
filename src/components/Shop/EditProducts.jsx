import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { server } from "../../server";
import axios from "axios";

const EditProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const { allProducts } = useSelector((state) => state.products);


  const params = useParams();
  //const [data, setData] = useState(null);
  //const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
      description:"",
      category:"",
      tags:"",
      originalPrice:0,
      discountPrice:0 ,
      stock:0,
      shopId:"",
      images:[],
      deliveryBy:"",
      deliveryTime:2,
  })
  
  
  useEffect(() => {
    console.log("started")
    const fetchProduct = async () => {
      //setFormData({...formData, description : "hi"})
      const productId = params.id;
      const res = await fetch(`${server}/product/get-product/${productId}`);
      
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchProduct();
  }, []);
  
  const [images, setImages] = useState([]);
/*   
  const [name, setName] = useState(formData.name);
  const [description, setDescription] = useState(formData.description);
  const [category, setCategory] = useState(formData.category);
  const [tags, setTags] = useState(formData.tags);
  const [originalPrice, setOriginalPrice] = useState(formData.originalPrice);
  const [discountPrice, setDiscountPrice] = useState(formData.discountPrice);
  const [deliveryBy, setDeliveryBy] = useState(formData.deliveryBy);
  const [deliveryTime, setDeliveryTime] = useState(formData.deliveryTime);
  const [stock, setStock] = useState(formData.stock);
 */


  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.set("images", image);
    });
    newForm.append("name", formData.name);
    newForm.append("description", formData.description);
    newForm.append("category", formData.category);
    newForm.append("tags", formData.tags);
    newForm.append("originalPrice", formData.originalPrice);
    newForm.append("discountPrice", formData.discountPrice);
    newForm.append("deliveryBy", formData.deliveryBy);
    newForm.append("deliveryTime", formData.deliveryTime);
    newForm.append("stock", formData.stock);
    //newForm.append("shopId", formData.seller._id);
    const productId = params.id;
    
    const  data   = await axios.put(
      `${server}/product/update-product/${productId}`,
      {"name" : formData.name,
      "description":formData.description,
      "category":formData.category,
      "tags":formData.tags,
      "originalPrice":formData.originalPrice,
      "discountPrice":formData.discountPrice,
      "stock":formData.stock,
      //shopId,
      //formData.images,
      "deliveryBy":formData.deliveryBy,
      "deliveryTime":formData.deliveryTime,}
    ).then((result) => {
      toast.success("Product Updated")
      navigate(`/product/${productId}`)
    }).catch((err) => {
      console.log(err)
    });
  };
  

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setFormData({...formData, name :e.target.value})}
            placeholder="Enter your product name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={formData.description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setFormData({...formData, description :e.target.value})}
            placeholder="Enter your product description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category :e.target.value})}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setFormData({...formData, tags :e.target.value})}
            placeholder="Enter your product tags..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={formData.originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setFormData({...formData, originalPrice :e.target.value})}
            placeholder="Enter your product price..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={formData.discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setFormData({...formData, discountPrice :e.target.value})}
            placeholder="Enter your product price with discount..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={formData.stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setFormData({...formData, stock :e.target.value})}
            placeholder="Enter your product stock..."
          /> 
        </div>
        <div className="my-3">
          <label className="pb-2">
            Delivery Method <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={formData.deliveryBy}
            onChange={(e) => setFormData({...formData, deliveryBy :e.target.value})}
          >
            <option value="Choose a delivery method">Choose a delivery method</option>
            <option value="Delivery by Volar">Delivery by Volar</option>
            <option value="Delivery by Myself">Delivery by Myself</option>
            
          </select>
        </div>
        {formData.deliveryBy==="Delivery by Myself"?
        <div>
        <label className="pb-2">
          Delivery Time <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="deliveryTime"
          value={formData.deliveryTime}
          className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => setFormData({...formData, deliveryTime :e.target.value})}
          placeholder="Enter your product stock..."
        />
      </div>
        :null}
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {formData.images &&
              formData.images.map((i) => (
                <img
                  src={i?.url}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
