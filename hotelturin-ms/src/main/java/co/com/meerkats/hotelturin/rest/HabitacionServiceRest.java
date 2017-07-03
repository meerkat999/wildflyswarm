package co.com.meerkats.hotelturin.rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import co.com.meerkats.hotelturin.dto.EstadoDTO;
import co.com.meerkats.hotelturin.dto.HabitacionDTO;
import co.com.meerkats.hotelturin.dto.ListHabitacionDTO;
import co.com.meerkats.hotelturin.logical.IHabitacionLogical;

@Path("/habitacionService")
public class HabitacionServiceRest {

	@Inject
	private IHabitacionLogical logical;
	
	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public List<HabitacionDTO> getAll(){
		return logical.getAll();
	}

	@POST
	@Path("/add")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public HabitacionDTO add(HabitacionDTO habitacion) throws Exception{
		return logical.add(habitacion);		
	}
	
	@POST
	@Path("/update")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public HabitacionDTO update(HabitacionDTO habitacion) throws Exception{
		return logical.update(habitacion);
	}
	
	@POST
	@Path("/desactivar")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public HabitacionDTO desactivar(HabitacionDTO habitacion) throws Exception{
		return logical.desactivar(habitacion);
	}	
	

	@POST
	@Path("/activar")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public HabitacionDTO activar(HabitacionDTO habitacion) throws Exception{
		return logical.activar(habitacion);
	}	
	
	
	
	@POST
	@Path("/getByState")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ListHabitacionDTO getByState (EstadoDTO estado){
		return logical.getByState(estado);
	}
	
	@POST
	@Path("/getById")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public HabitacionDTO getById(HabitacionDTO habitaciondto){
		return logical.getById(habitaciondto);
	}
	
}


