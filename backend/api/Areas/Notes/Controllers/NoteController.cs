
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pims.Api.Constants;
using Pims.Api.Models.Concepts;
using Pims.Api.Policies;
using Pims.Api.Services;
using Pims.Dal.Security;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;

namespace Pims.Api.Areas.Notes.Controllers
{
    /// <summary>
    /// NoteController class, provides endpoints for interacting with notes.
    /// </summary>
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Area("notes")]
    [Route("v{version:apiVersion}/[area]")]
    [Route("[area]")]
    public class NoteController : ControllerBase
    {
        #region Variables
        private readonly INoteService _noteService;
        private readonly IMapper _mapper;
        #endregion

        #region Constructors
        /// <summary>
        /// Creates a new instance of a NoteController class, initializes it with the specified arguments.
        /// </summary>
        /// <param name="noteService"></param>
        /// <param name="mapper"></param>
        ///
        public NoteController(INoteService noteService, IMapper mapper)
        {
            _noteService = noteService;
            _mapper = mapper;
        }
        #endregion

        #region Endpoints

        /// <summary>
        /// Add the specified note.
        /// </summary>
        /// <param name="type">The parent entity type.</param>
        /// <param name="noteModel">The note to add.</param>
        /// <returns></returns>
        [HttpPost("{type}")]
        [HasPermission(Permissions.NoteAdd)]
        [Produces("application/json")]
        [ProducesResponseType(typeof(EntityNoteModel), 200)]
        [SwaggerOperation(Tags = new[] { "note" })]
        public IActionResult AddNote(NoteType type, [FromBody] EntityNoteModel noteModel)
        {
            var createdNote = _noteService.Add(type, noteModel);
            return new JsonResult(createdNote);
        }

        /// <summary>
        /// Get the notes for the specified type.
        /// </summary>
        /// <param name="type">Used to identify note type.</param>
        /// <returns></returns>
        [HttpGet("{type}")]
        [Produces("application/json")]
        [HasPermission(Permissions.NoteView)]
        [ProducesResponseType(typeof(IEnumerable<NoteModel>), 200)]
        [SwaggerOperation(Tags = new[] { "note" })]
        public IActionResult GetNotes(NoteType type)
        {
            var notes = _noteService.GetNotes(type);
            var mappedNotes = _mapper.Map<List<NoteModel>>(notes);
            return new JsonResult(mappedNotes);
        }

        /// <summary>
        /// Deletes the note for the specified type.
        /// </summary>
        /// <param name="type">Used to identify note type.</param>
        /// <param name="noteId">Used to identify the note and delete it.</param>
        /// <returns></returns>
        [HttpDelete("{type}/{noteId}")]
        [Produces("application/json")]
        [HasPermission(Permissions.NoteDelete)]
        [ProducesResponseType(typeof(bool), 200)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [SwaggerOperation(Tags = new[] { "note" })]
        public IActionResult DeleteNote(NoteType type, int noteId)
        {
            _noteService.DeleteNote(type, noteId);
            return new JsonResult(true);
        }
        #endregion
    }
}