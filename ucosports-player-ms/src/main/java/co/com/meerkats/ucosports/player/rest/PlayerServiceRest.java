package co.com.meerkats.ucosports.player.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import co.com.meerkats.ucosports.domain.Player;
import co.com.meerkats.ucosports.domain.dto.PlayerDTO;
import co.com.meerkats.ucosports.player.logical.PlayerLogical;

@Path("/playerService")
public class PlayerServiceRest {

	@Inject
	private PlayerLogical logical;
	
	@Path("/getPlayerById/")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Player getPlayerById(PlayerDTO playerDto) {
		Player player = null;
		if(playerDto != null && playerDto.id != null){
			player = logical.findPlayerById(playerDto.id);
		}
		return player;
	}
}