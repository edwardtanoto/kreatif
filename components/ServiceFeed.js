const ServiceFeed = ({services}) => {
    return services ? services.map((service) => <ServiceItem service={service} key={service.brief}  />) : null;
}

const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
}

function ServiceItem({service}) {
    return (
        <div>
         {`${service.item} - ${rupiah(service.price)} `}
         <p>{service.brief}</p>
        </div>
    )
}

export default ServiceFeed