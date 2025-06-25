import React, { useEffect, useState } from 'react'
import MainCarousel from '../Home/MainCarousel'
import { Row, Col, Card, Carousel } from 'antd'
import { useNavigate } from 'react-router-dom';
import routePath from '../../constants/routePath';
import { db } from '../../utils/firebase'
import { useFirestore } from '../../hooks/useFirestore'
import { Flame, Clock } from 'lucide-react';

function Sale() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const { getAllDocs } = useFirestore(db, "eventAMZ");

    useEffect(() => {
        getAllDocs().then(setEvents);
    }, []);

    return (
        <div>
            <div className="mb-4">
                <nav className="flex items-center gap-2 text-sm">
                    {/* Home icon */}
                    <span className="flex items-center gap-1 text-black border-2 p-2 rounded-full border-black" onClick={() => navigate(routePath.home)}>
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                            <path d="M3 10.75L12 4l9 6.75" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.5 10.75V19a1 1 0 001 1h3.5v-4.25a1 1 0 011-1h2a1 1 0 011 1V20H18.5a1 1 0 001-1v-8.25" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Trang chủ</span>
                    </span>

                    {/* Divider */}
                    <span className="mx-1 text-black">{'>'}</span>
                    {/* Product name */}
                    <span className="flex items-center gap-1 bg-orange-500 text-white font-semibold p-2 rounded-full border-2 border-orange-500">
                        {'Khuyến mãi hot'}
                    </span>
                </nav>
            </div>
            {/* <MainCarousel /> */}
            {/* tất cả sự kiện bằng Carousel  */}
            <Carousel dots={true} autoplay arrows={true}>
                {events.map(event => (
                    <div key={event.id} className="relative group" style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '1/0.6551724137931034', width: '100%' }}>
                        <img
                            alt={event.name}
                            src={event.linkBanner}
                            style={{ width: '100%', height: 380, objectFit: 'cover' }}
                        />
                        {/*
                        <div
                            className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ borderRadius: 8 }}
                        >
                            <h3 className="text-white text-lg font-semibold mb-2">{event.name}</h3>
                            <div className="text-white text-sm">
                                {event.date} - {event.endDate}
                            </div>
                        </div>
                        */}
                    </div>
                ))}
            </Carousel>

            <div className="mt-8">
                <h2 className="!text-base font-bold mb-[20px] mt-[34px] flex items-center gap-2">
                    Khuyến mãi HOT <Flame size={24} className="text-orange-500" />
                </h2>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={16}>
                        {events[0] && (
                            <div className="relative group" style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '1/0.6551724137931034', width: '100%' }}>
                                <img
                                    src={events[0].linkBanner}
                                    alt={events[0].name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                {/*
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <h3 className="text-white text-lg font-semibold mb-2">{events[0].name}</h3>
                                    <div className="text-white text-sm">
                                        {events[0].date} - {events[0].endDate}
                                    </div>
                                </div>
                                */}
                            </div>
                        )}
                    </Col>
                    <Col xs={24} md={8}>
                        <Row gutter={[0, 16]}>
                            <Col span={24}>
                                {events[1] && (
                                    <div className="relative group" style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '1/0.6551724137931034', width: '100%' }}>
                                        <img
                                            src={events[1].linkBanner}
                                            alt={events[1].name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        {/*
                                        <div
                                            className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <h3 className="text-white text-lg font-semibold mb-2">{events[1].name}</h3>
                                            <div className="text-white text-sm">
                                                {events[1].date} - {events[1].endDate}
                                            </div>
                                        </div>
                                        */}
                                    </div>
                                )}
                            </Col>
                            <Col span={24}>
                                {events[2] && (
                                    <div className="relative group" style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '1/0.6551724137931034', width: '100%' }}>
                                        <img
                                            src={events[2].linkBanner}
                                            alt={events[2].name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        {/*
                                        <div
                                            className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <h3 className="text-white text-lg font-semibold mb-2">{events[2].name}</h3>
                                            <div className="text-white text-sm">
                                                {events[2].date} - {events[2].endDate}
                                            </div>
                                        </div>
                                        */}
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <div className="mt-8">
                <h2 className="!text-base font-bold mb-[20px] mt-[34px] flex items-center gap-2">
                    Sắp diễn ra <Clock size={24} className="text-blue-500" />
                </h2>
                <Row gutter={[16, 16]}>
                    {events
                        .filter(event => {
                            // Lọc sự kiện có ngày bắt đầu >= hôm nay
                            const today = new Date();
                            const eventDate = new Date(event.date);
                            return eventDate >= today;
                        })
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .slice(0, 4)
                        .map(event => (
                            <Col xs={24} md={12} key={event.id}>
                                <div className="relative group" style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '1/0.6551724137931034', width: '100%' }}>
                                    <img
                                        alt={event.name}
                                        src={event.linkBanner}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    {/* 
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <h3 className="text-white text-lg font-semibold mb-2">{event.name}</h3>
                                        <div className="text-white text-sm">
                                            {event.date} - {event.endDate}
                                        </div>
                                    </div>
                                    */}
                                </div>
                            </Col>
                        ))}
                </Row>
            </div>



            {/* Hiển thị tất cả sự kiện bằng Carousel */}

        </div>
    )
}

export default Sale
