const ServiceFeed = ({services}) => {
    return services ? services.map((service) => <ServiceItem service={service} key={service.brief}  />) : null;
}

function ServiceItem({service}) {
    return (
        <div>
         {`${service.item} - $${service.price} `}
         <p>{service.brief}</p>
        </div>
    )
}

export default ServiceFeed