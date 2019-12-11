export const users = {
  admin: {
    username: "admin",
    password: "admin",
    displayName: "Admin",
    email: "admin@healthyandbalance.com",
    gender: 1,
    isActive: true,
    followingPosts: [],
    markedPosts: [],
    role: "admin",
    avatar: "/media/images/users/placeholder.png",
  },
  nvphuoc: {
    username: "nvphuoc",
    password: "nvphuoc",
    displayName: "Nguyen Van Phuoc",
    email: "nvphuoc@healthyandbalance.com",
    gender: 1,
    isActive: true,
    followingPosts: [],
    markedPosts: [],
    role: "user",
    avatar: "/media/images/users/placeholder.png",
  },
  phhviet: {
    username: "phhviet",
    password: "phhviet",
    displayName: "Pham Huu Hoang Viet",
    email: "phhviet@healthyandbalance.com",
    gender: 1,
    isActive: true,
    followingPosts: [],
    markedPosts: [],
    role: "user",
    avatar: "/media/images/users/placeholder.png",
  },
  ngtu: {
    username: "ngtu",
    password: "ngtu",
    displayName: "Nguyen Huu Tu",
    email: "phhviet@healthyandbalance.com",
    gender: 1,
    isActive: true,
    followingPosts: [],
    markedPosts: [],
    role: "user",
    avatar: "/media/images/users/placeholder.png",
  },
};
export const commonCategories = [
  { id: "new", title: "Bài viết mới", url: "/category/new" },
  { id: "following", title: "Đang theo dõi", url: "/category/following" },
  { id: "marked", title: "Đã đánh dấu", url: "/category/marked" },
];
export const categories = [
  { id: "categ01", title: "Sức khỏe", url: "/category/categ01" },
  { id: "categ02", title: "Sống khỏe", url: "/category/categ02" },
  { id: "categ03", title: "Thể thao", url: "/category/categ03" },
  { id: "categ04", title: "Theo mùa", url: "/category/categ04" },
];
// {
//   categ01: "Sức khỏe",
//   categ02: "Sống khỏe",
//   categ03: "Thể thao",
//   categ04: "Theo mùa",
// };
export const posts = [
  {
    id: 1,
    title: "Bí quyết giảm béo hiệu quả",
    category: "categ01",
    status: 0,
    image: null,
    shortDescription: "Post 01 description",
    content: `<div class="sapo_detail" style="margin: 0px 0px 20px; padding: 0px; list-style: none; outline: none; line-height: 20px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: rgb(68, 68, 68);">Suckhoedoisong.vn - Ăn nhiều là một nguyên nhân quan trọng dẫn tới béo phì. Trong khi việc ăn này lại bị chi phối chủ yếu bởi não bộ. Một số bí quyết sau giúp chúng ta giảm béo hiệu quả…</div><div id="abdf" style="margin: 0px; padding: 0px; list-style: none; outline: none; line-height: normal; font-family: roboto, Arial, Helvetica, sans-serif;"><div id="content_detail_news" style="margin: 0px 0px 15px; padding: 0px 0px 15px; list-style: none; outline: none; overflow: hidden; color: rgb(17, 17, 17); line-height: 22px !important; font-family: Arial, Helvetica, sans-serif !important; overflow-wrap: break-word !important;"><p style="padding: 0px; list-style: none; outline: none; text-align: justify; color: rgb(17, 17, 17); margin-bottom: 5px !important; line-height: 22px !important; font-size: 15px !important; overflow-wrap: break-word !important;"><strong style="margin: 0px; padding: 0px; list-style: none; outline: none; line-height: 23px; overflow-wrap: break-word !important;">Ý thức là yếu tố quan trọng nhất</strong></p><p class="bodytexchunhat" style="padding: 0px; list-style: none; outline: none; text-align: justify; color: rgb(17, 17, 17); margin-bottom: 5px !important; line-height: 22px !important; font-size: 15px !important; overflow-wrap: break-word !important;">Trong cơ chế điều khiển cảm giác no đói, hormon đóng vai trò chủ đạo. Một mặt là insulin, hormon do tuyến tụy tạo ra khi chúng ta đã ăn no, cùng những hợp chất khác được sản xuất trong hệ tiêu hóa. Mặt khác, là các chất dẫn truyền thần kinh, tức các hormon xuất hiện trong hệ thần kinh, như adrenalin. Sự hiện diện của adrenalin khiến chúng ta không có cảm giác đói bụng, nó cũng xuất hiện khi chúng ta si tình hoặc căng thẳng vì lý do nào đó.</p><p class="bodytexchunhat" style="padding: 0px; list-style: none; outline: none; text-align: justify; color: rgb(17, 17, 17); margin-bottom: 5px !important; line-height: 22px !important; font-size: 15px !important; overflow-wrap: break-word !important;">Tất cả những hợp chất trên tác động đến hoạt động của não bộ theo cách mà phần nhiều chúng ta không nhận biết được. Tuy nhiên hoàn toàn có thể tận dụng hiệu quả chính cơ chế này trong cuộc chiến chống béo phì, thừa cân. Ngày nay, các nhà khoa đều nhất trí cho rằng, ý thức là yếu tố quan trọng nhất trong nỗ lực giảm béo, giảm cân.</p><p class="bodytexchunhat" style="padding: 0px; list-style: none; outline: none; text-align: justify; color: rgb(17, 17, 17); margin-bottom: 5px !important; line-height: 22px !important; font-size: 15px !important; overflow-wrap: break-word !important;">&nbsp;</p><p class="bodytexchunhat" style="padding: 0px; list-style: none; outline: none; text-align: justify; color: rgb(17, 17, 17); margin-bottom: 5px !important; line-height: 22px !important; font-size: 15px !important; overflow-wrap: break-word !important;"><img title="Bí quyết giảm béo hiệu quả 1" src="https://media.suckhoedoisong.vn/Images/duylinh/2017/12/14/01._nan_nhan_beo_phi.jpg" alt="bi-quyet-giam-beo-hieu-qua-1" width="450" height="287" style="padding: 0px; list-style: none; outline: none; max-width: 100%; display: block; margin: auto !important; line-height: 22px !important; border-style: none !important; height: auto !important; overflow-wrap: break-word !important;"></p><p class="Chuthichanh" style="padding: 0px; list-style: none; outline: none; text-align: center; color: rgb(17, 17, 17); margin-bottom: 5px !important; line-height: 22px !important; font-size: 15px !important; overflow-wrap: break-word !important;"><em style="margin: 0px; padding: 0px; list-style: none; outline: none; line-height: 22px !important; overflow-wrap: break-word !important;">Nạn nhân béo phì.</em></p><h2 class="titnoichunhat" style="padding: 0px; list-style: none; outline: none; display: inline; color: rgb(17, 17, 17); margin-top: 5px !important; margin-bottom: 5px !important; line-height: 22px !important; font-weight: bold !important; font-size: 15px !important; font-family: Arial, Helvetica, sans-serif !important; overflow-wrap: break-word !important;"><strong style="margin: 0px; padding: 0px; list-style: none; outline: none; line-height: 22px !important; overflow-wrap: break-word !important;">Lối sống là vấn đề then chốt</strong></h2><p class="bodytexchunhat" style="padding: 0px; list-style: none; outline: none; text-align: justify; color: rgb(17, 17, 17); margin-bottom: 5px !important; line-height: 22px !important; font-size: 15px !important; overflow-wrap: break-word !important;">Đến nay người ta vẫn chưa biết rõ nguyên nhân đại dịch béo phì. Một trong nhiều giả thiết cho rằng, đơn giản vì chúng ta lười vận động. Tổ tiên chúng ta lao động chân tay vất vả hơn nhiều và hàng ngày đi bộ nhiều hơn, vì thế tự nhiên cơ thể tiền nhân “đốt cháy” năng lượng hiệu quả hơn. Kết quả những công trình nghiên cứu như Nurses’ Health Study cho thấy, thói quen xem tivi 2 giờ/ngày tăng 23% nguy cơ phát triển béo phì, trái lại đi bộ tốc độ nhanh 1 giờ/ngày giảm 24% nguy cơ béo phì. Nguy cơ béo phì tăng thậm chí vì lý do chúng ta có cơ hội thụ hưởng cảm giác thoải mái nhờ vận hành hệ thống máy điều hòa nhiệt độ vào mùa hè và sưởi ấm nhân tạo vào mùa đông. Bởi môi trường sống dễ chịu khiến cơ thể cắt giảm đáng kể năng lượng tự điều hòa thân nhiệt và nguy cơ béo phì tăng nhờ khoản năng lượng dư thừa.</p><ins class="370d0bec" data-key="64df7b40caf7a9428fb04b39b7fdce15" id="370d0bec-64df7b40caf7a9428fb04b39b7fdce15-0-5428" style="margin: 0px; padding: 0px; list-style: none; outline: none; text-decoration-line: none; display: block; background: transparent; height: 0px; overflow: hidden; line-height: 22px !important; font-size: 15px !important; overflow-wrap: break-word !important;"><ins id="370d0bec-64df7b40caf7a9428fb04b39b7fdce15-0-5428-1" style="margin: 0px; padding: 0px; list-style: none; outline: none; text-decoration-line: none; display: block; background: transparent; line-height: 22px !important; overflow-wrap: break-word !important;"></ins></ins><div style="margin: 0px; padding: 0px; list-style: none; outline: none; display: inline-block; width: 530px; overflow: hidden; float: left; line-height: 22px !important; font-size: 15px !important; overflow-wrap: break-word !important;"><ul style="margin-right: 0px; margin-left: 0px; padding: 0px; list-style: none; outline: none; text-align: justify; display: flex; margin-bottom: 5px !important; line-height: 22px !important; overflow-wrap: break-word !important;"></ul></div><p class="bodytexchunhat" style="padding: 0px; list-style: none; outline: none; text-align: justify; color: rgb(17, 17, 17); margin-bottom: 5px !important; line-height: 22px !important; font-size: 15px !important; overflow-wrap: break-word !important;">Tuy nhiên, khi GS. John Speakman thuộc Đại học Aberdeen (Vương quốc Anh) và GS. Klass Westerterp (Đại học Maastricht, Hà Lan) nghiên cứu 800 tình nguyện viên bất kỳ, kết quả cho thấy, chỉ số năng lượng người dân châu Âu sử dụng cho hoạt động thể chất kể từ năm 1982 giảm thiểu không đáng kể so với vài thập kỷ trước. Như vậy, cho dù chúng ta không lười vận động thể chất, song vẫn có nhiều người béo phì, điều đó chứng tỏ, thủ phạm béo phì nằm ở chỗ khác.</p><p class="bodytexchunhat" style="padding: 0px; list-style: none; outline: none; text-align: justify; color: rgb(17, 17, 17); margin-bottom: 5px !important; line-height: 22px !important; font-size: 15px !important; overflow-wrap: break-word !important;">Chúng ta ăn quá nhiều không chỉ về phương diện số lượng thức ăn, mà cả chất lượng bữa ăn quá giàu calori. Bột mỳ (hoặc gạo) trắng, các chất béo động vật, sự hiện diện đường trong nhiều món ăn và đồ uống, rượu bia - chúng ta tiêu hóa tất cả và nhanh chóng, cung cấp cho cơ thể khối lượng khổng lồ năng lượng, để rồi sau đó, bộ phận đáng kể được “lưu kho” ở dạng mô mỡ.</p><p class="bodytexchunhat" style="padding: 0px; list-style: none; outline: none; text-align: justify; color: rgb(17, 17, 17); margin-bottom: 5px !important; line-height: 22px !important; font-size: 15px !important; overflow-wrap: break-word !important;">&nbsp;</p><p class="bodytexchunhat" style="padding: 0px; list-style: none; outline: none; text-align: justify; color: rgb(17, 17, 17); margin-bottom: 5px !important; line-height: 22px !important; font-size: 15px !important; overflow-wrap: break-word !important;"><img title="Bí quyết giảm béo hiệu quả 2" src="https://media.suckhoedoisong.vn/Images/duylinh/2017/12/14/thuc-don-giam-can1.jpg" alt="bi-quyet-giam-beo-hieu-qua-2" width="450" height="301" style="padding: 0px; list-style: none; outline: none; max-width: 100%; display: block; margin: auto !important; line-height: 22px !important; border-style: none !important; height: auto !important; overflow-wrap: break-word !important;"></p><p class="Chuthichanh" style="padding: 0px; list-style: none; outline: none; text-align: center; color: rgb(17, 17, 17); margin-bottom: 5px !important; line-height: 22px !important; font-size: 15px !important; overflow-wrap: break-word !important;"><em style="margin: 0px; padding: 0px; list-style: none; outline: none; line-height: 22px !important; overflow-wrap: break-word !important;">Cần ăn một cách có ý thức, vui vẻ, chậm và thư thái.</em></p></div></div>`,
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 2,
    title: "Post 02",
    category: "categ01",
    status: 0,
    image: null,
    shortDescription: "Post 02 description",
    content: "Post 01 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 3,
    title: "Post 03",
    category: "categ01",
    status: 1,
    image: null,
    shortDescription: "Post 03 description",
    content: "Post 03 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 4,
    title: "Post 04",
    category: "categ03",
    status: -1,
    image: null,
    shortDescription: "Post 04 description",
    content: "Post 04 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 5,
    title: "Post 05",
    category: "categ02",
    status: -1,
    image: null,
    shortDescription: "Post 05 description",
    content: "Post 01 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 6,
    title: "Post 06",
    category: "categ04",
    status: 0,
    image: null,
    shortDescription: "Post 06 description",
    content: "Post 06 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 7,
    title: "Post 07",
    category: "categ01",
    status: 1,
    image: null,
    shortDescription: "Post 07 description",
    content: "Post 07 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 8,
    title: "Post 08",
    category: "categ02",
    status: -1,
    image: null,
    shortDescription: "Post 08 description",
    content: "Post 08 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 9,
    title: "Post 09",
    category: "categ03",
    status: 0,
    image: null,
    shortDescription: "Post 09 description",
    content: "Post 09 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 10,
    title: "Post 10",
    category: "categ01",
    status: 0,
    image: null,
    shortDescription: "Post 10 description",
    content: "Post 10 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 11,
    title: "Post 11",
    category: "categ03",
    status: 1,
    image: null,
    shortDescription: "Post 10 description",
    content: "Post 10 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 12,
    title: "Post 12",
    category: "categ01",
    status: 1,
    image: null,
    shortDescription: "Post 12 description",
    content: "Post 12 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 13,
    title: "Post 13",
    category: "categ03",
    status: 0,
    image: null,
    shortDescription: "Post 13 description",
    content: "Post 13 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 14,
    title: "Post 14",
    category: "categ04",
    status: -1,
    image: null,
    shortDescription: "Post 14 description",
    content: "Post 14 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 15,
    title: "Post 14",
    category: "categ02",
    status: 0,
    image: null,
    shortDescription: "Post 14 description",
    content: "Post 14 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 16,
    title: "Post 15",
    category: "categ03",
    status: 1,
    image: null,
    shortDescription: "Post 15 description",
    content: "Post 15 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 17,
    title: "Post 16",
    category: "categ04",
    status: -1,
    image: null,
    shortDescription: "Post 16 description",
    content: "Post 16 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
  {
    id: 18,
    title: "Post 17",
    category: "categ04",
    status: 1,
    image: null,
    shortDescription: "Post 17 description",
    content: "Post 17 content",
    createdDate: "2019-12-10",
    author: "ngtu",
  },
];
