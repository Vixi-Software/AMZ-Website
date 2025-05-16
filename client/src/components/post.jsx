import React from 'react';
import SmartImg from './ImageResizeCompressFromURL';

function Post() {
    const posts = [
        {
            title: "Tiêu đề số 1 bài viết về tai nghe",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque lorem quis malesuada himenaeos parturient nec ac in vitae. Luctus sit convallis mollis habitant lorem ullamcorper maecenas at euismod turpis. Egestas elementum pulvinar tincidunt nec eu blandit cras ipsum phasellus adipiscing. Tempor fringilla dui mus ligula curabitur id sed duis ipsum elementum. Amet vel nullam varius tortor euismod semper enim dui neque mi.",
            imgSrc: "https://tiki.vn/blog/wp-content/uploads/2023/03/2Xq9EU32ciB99wavAPMcU0C-cewBnunDpxPK-6oem3SxkaHsvXgwDhKlfBph4DbP2QzwuHNsNERsziRtl8Qz4TWVUsQ8neLC5tLkqtg5U3dtQR1hMEc8s1kn73yvUJJemzAEKQ0jxyZesckWxGGCFc8.png"
        },
        {
            title: "Tiêu đề số 2 bài viết về tai nghe",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque lorem quis malesuada himenaeos parturient nec ac in vitae. Luctus sit convallis mollis habitant lorem ullamcorper maecenas at euismod turpis. Egestas elementum pulvinar tincidunt nec eu blandit cras ipsum phasellus adipiscing. Tempor fringilla dui mus ligula curabitur id sed duis ipsum elementum. Amet vel nullam varius tortor euismod semper enim dui neque mi.",
            imgSrc: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sony-headphones-1655129564.jpg?crop=0.790xw:0.594xh;0.112xw,0.212xh&resize=1200:*"
        },
        {
            title: "Tiêu đề số 3 bài viết về tai nghe",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque lorem quis malesuada himenaeos parturient nec ac in vitae. Luctus sit convallis mollis habitant lorem ullamcorper maecenas at euismod turpis. Egestas elementum pulvinar tincidunt nec eu blandit cras ipsum phasellus adipiscing. Tempor fringilla dui mus ligula curabitur id sed duis ipsum elementum. Amet vel nullam varius tortor euismod semper enim dui neque mi.",
            imgSrc: "https://i.ytimg.com/vi/Ph4f8gbnJhc/maxresdefault.jpg"
        },
        {
            title: "Tiêu đề số 4 bài viết về tai nghe",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque lorem quis malesuada himenaeos parturient nec ac in vitae. Luctus sit convallis mollis habitant lorem ullamcorper maecenas at euismod turpis. Egestas elementum pulvinar tincidunt nec eu blandit cras ipsum phasellus adipiscing. Tempor fringilla dui mus ligula curabitur id sed duis ipsum elementum. Amet vel nullam varius tortor euismod semper enim dui neque mi.",
            imgSrc: "https://9to5mac.com/wp-content/uploads/sites/6/2022/11/Affordable-hearing-aids.jpg?quality=82&strip=all&w=1280"
        },
        {
            title: "Tiêu đề số 5 bài viết về tai nghe",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque lorem quis malesuada himenaeos parturient nec ac in vitae. Luctus sit convallis mollis habitant lorem ullamcorper maecenas at euismod turpis. Egestas elementum pulvinar tincidunt nec eu blandit cras ipsum phasellus adipiscing. Tempor fringilla dui mus ligula curabitur id sed duis ipsum elementum. Amet vel nullam varius tortor euismod semper enim dui neque mi.",
            imgSrc: "https://article.images.consumerreports.org/image/upload/v1566938487/prod/content/dam/CRO%20Images%202019/Magazine/10October/CR-Electronics-Inlinehero-galaxy-pods-vs-airpods-v3-0819"
        }
    ];

    const data = {
        mainImg: "https://media.product.which.co.uk/prod/images/ar_2to1_1500x750/1cef57c41800-headphone-comp.jpg",
        posts: posts
    };

    return (
        <div className='mt-4'>
            <SmartImg imageUrl={data.mainImg} height={500} alt="main img" className='h-[500px] w-full object-cover rounded-3 mb-4' />
            <div>
                {data.posts.map((post, index) => (
                    <div key={index}>
                        <h4>{post.title}</h4>
                        <p className="text-justify">{post.content}</p>
                        <SmartImg imageUrl={post.imgSrc} height={350} alt="" className='mb-3 mx-auto w-8/10 h-[350px] object-cover rounded-3' />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Post;